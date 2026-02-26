
export class Scheduler {
    constructor(supabaseClient) {
        this.supabase = supabaseClient;
    }

    async calculateSchedule(projectId) {
        try {
            console.log(`Starting schedule calculation for project ${projectId}`);

            // 1. Fetch Data
            const { data: project, error: projectError } = await this.supabase
                .from('projects')
                .select('*')
                .eq('id', projectId)
                .single();

            if (projectError) throw new Error(`Project fetch error: ${projectError.message}`);
            if (!project) throw new Error('Project not found');

            const { data: tasks, error: tasksError } = await this.supabase
                .from('tasks')
                .select('*')
                .eq('project_id', projectId);

            if (tasksError) throw new Error(`Tasks fetch error: ${tasksError.message}`);

            const taskIds = tasks.map(t => t.id);
            if (taskIds.length === 0) return { message: 'No tasks found' };

            const { data: dependencies, error: depError } = await this.supabase
                .from('task_dependencies')
                .select('*')
                .in('task_id', taskIds);

            if (depError) throw new Error(`Dependencies fetch error: ${depError.message}`);

            const { data: constraints, error: constError } = await this.supabase
                .from('constraints')
                .select('*')
                .in('task_id', taskIds);

            if (constError) throw new Error(`Constraints fetch error: ${constError.message}`);

            console.log(`Fetched ${tasks.length} tasks, ${dependencies.length} dependencies, ${constraints.length} constraints.`);

            // 2. Build Graph
            const graph = new Map();
            tasks.forEach(task => {
                graph.set(task.id, {
                    ...task,
                    predecessors: [],
                    successors: [],
                    es: null, // Earliest Start
                    ef: null, // Earliest Finish
                    ls: null, // Latest Start
                    lf: null, // Latest Finish
                    constraintDate: null
                });
            });

            // Apply constraints
            constraints.forEach(c => {
                if (graph.has(c.task_id) && c.available_date) {
                    const node = graph.get(c.task_id);
                    const cDate = new Date(c.available_date).getTime();
                    if (!node.constraintDate || cDate > node.constraintDate) {
                        node.constraintDate = cDate;
                    }
                }
            });

            // Map dependencies
            dependencies.forEach(dep => {
                if (graph.has(dep.task_id) && graph.has(dep.depends_on_task_id)) {
                    // dep.task_id DEPENDS ON dep.depends_on_task_id
                    // So dep.depends_on_task_id is PREDECESSOR of dep.task_id
                    graph.get(dep.task_id).predecessors.push(dep.depends_on_task_id);
                    graph.get(dep.depends_on_task_id).successors.push(dep.task_id);
                }
            });

            // 3. Cycle Detection & Topological Sort
            const visited = new Set();
            const recursionStack = new Set();
            const stack = []; // For topological order

            const visit = (nodeId) => {
                if (recursionStack.has(nodeId)) throw new Error(`Cycle detected involving task ${nodeId}`);
                if (visited.has(nodeId)) return;

                visited.add(nodeId);
                recursionStack.add(nodeId);

                const node = graph.get(nodeId);
                node.successors.forEach(succId => visit(succId));

                recursionStack.delete(nodeId);
                stack.push(nodeId);
            };

            for (const taskId of graph.keys()) {
                if (!visited.has(taskId)) {
                    visit(taskId);
                }
            }

            const topoOrder = stack.reverse();

            // 4. Forward Pass (ES, EF)
            // If project start date is not set, use today.
            // Ensure project.start_date handles timezone correctly or is just a date string.
            // new Date('YYYY-MM-DD') creates date at 00:00 UTC usually.
            const projectStartDate = project.start_date ? new Date(project.start_date).getTime() : new Date().setHours(0,0,0,0);

            topoOrder.forEach(taskId => {
                const node = graph.get(taskId);

                let maxPredEF = projectStartDate;
                node.predecessors.forEach(predId => {
                    const pred = graph.get(predId);
                    if (pred.ef > maxPredEF) {
                        maxPredEF = pred.ef;
                    }
                });

                // Apply constraints (Must start on or after)
                let es = maxPredEF;
                if (node.constraintDate && node.constraintDate > es) {
                    es = node.constraintDate;
                }

                node.es = es;
                // Duration is in days. Convert to ms.
                const durationMs = (node.duration_days || 0) * 24 * 60 * 60 * 1000;
                node.ef = es + durationMs;
            });

            // 5. Backward Pass (LS, LF)
            // Calculate Project Finish Time
            let projectFinishTime = projectStartDate;
            for (const node of graph.values()) {
                if (node.ef > projectFinishTime) {
                    projectFinishTime = node.ef;
                }
            }

            // Traverse in reverse topological order
            const reverseTopoOrder = [...topoOrder].reverse();

            reverseTopoOrder.forEach(taskId => {
                const node = graph.get(taskId);

                let minSuccLS = projectFinishTime;

                if (node.successors.length === 0) {
                     minSuccLS = projectFinishTime;
                } else {
                     let minFound = null;
                     node.successors.forEach(succId => {
                        const succ = graph.get(succId);
                        if (minFound === null || succ.ls < minFound) {
                            minFound = succ.ls;
                        }
                     });
                     if (minFound !== null) minSuccLS = minFound;
                }

                node.lf = minSuccLS;
                const durationMs = (node.duration_days || 0) * 24 * 60 * 60 * 1000;
                node.ls = node.lf - durationMs;
            });

            // 6. Update Database
            const updates = [];
            for (const node of graph.values()) {
                if (node.es !== null && node.ls !== null) {
                    updates.push({
                        id: node.id,
                        earliest_start: new Date(node.es).toISOString().split('T')[0],
                        latest_start: new Date(node.ls).toISOString().split('T')[0]
                    });
                }
            }

            console.log(`Updating ${updates.length} tasks...`);

            if (updates.length > 0) {
                const { error: updateError } = await this.supabase
                    .from('tasks')
                    .upsert(updates, { onConflict: 'id' });

                if (updateError) throw new Error(`Update tasks error: ${updateError.message}`);
            }

            // 7. Detect Resource Conflicts
            const currentProjectTasks = Array.from(graph.values()).map(node => ({
                id: node.id,
                name: node.name,
                start: node.es,
                end: node.ef,
                required_resources: node.required_resources
            }));

            const conflicts = await this.detectResourceConflicts(projectId, currentProjectTasks);

            return {
                message: 'Schedule recalculated',
                projectFinishDate: new Date(projectFinishTime).toISOString().split('T')[0],
                tasksUpdated: updates.length,
                conflicts
            };

        } catch (error) {
            console.error('Scheduler Error:', error);
            throw error;
        }
    }

    async detectResourceConflicts(projectId, currentProjectTasks) {
        // Filter tasks that have resources
        const resourceTasks = currentProjectTasks.filter(t => t.required_resources && Array.isArray(t.required_resources) && t.required_resources.length > 0);
        if (resourceTasks.length === 0) return [];

        // Fetch tasks from other active projects
        const { data: otherTasks, error } = await this.supabase
            .from('tasks')
            .select(`
                id,
                name,
                project_id,
                earliest_start,
                duration_days,
                required_resources,
                projects (name, status)
            `)
            .neq('project_id', projectId)
            .neq('status', 'completed'); // Filter out completed tasks if needed, or based on project status

        if (error) {
            console.error('Error fetching other tasks for conflict detection:', error);
            return [];
        }

        const conflicts = [];

        for (const myTask of resourceTasks) {
            for (const otherTask of otherTasks) {
                // Skip if other task has no resources or project is not active/planning/in_progress
                if (!otherTask.required_resources || !Array.isArray(otherTask.required_resources) || otherTask.required_resources.length === 0) continue;
                if (otherTask.projects && otherTask.projects.status === 'completed') continue;

                // Check for shared resources
                const sharedResources = myTask.required_resources.filter(r => otherTask.required_resources.includes(r));
                if (sharedResources.length === 0) continue;

                // Determine other task time range
                let otherStart = null;
                let otherEnd = null;

                if (otherTask.earliest_start) {
                    otherStart = new Date(otherTask.earliest_start).getTime();
                    const durationMs = (otherTask.duration_days || 0) * 24 * 60 * 60 * 1000;
                    otherEnd = otherStart + durationMs;
                }

                // If other task has no scheduled start, skip
                if (!otherStart) continue;

                // Check Overlap
                // Overlap if (StartA < EndB) and (EndA > StartB)
                if (myTask.start < otherEnd && myTask.end > otherStart) {
                    conflicts.push({
                        resource: sharedResources.join(', '),
                        task_a: { id: myTask.id, name: myTask.name, start: new Date(myTask.start).toISOString().split('T')[0], end: new Date(myTask.end).toISOString().split('T')[0] },
                        task_b: { id: otherTask.id, name: otherTask.name, project: otherTask.projects?.name, start: new Date(otherStart).toISOString().split('T')[0], end: new Date(otherEnd).toISOString().split('T')[0] }
                    });
                }
            }
        }

        return conflicts;
    }
}
