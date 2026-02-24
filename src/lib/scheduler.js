
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

            return {
                message: 'Schedule recalculated',
                projectFinishDate: new Date(projectFinishTime).toISOString().split('T')[0],
                tasksUpdated: updates.length
            };

        } catch (error) {
            console.error('Scheduler Error:', error);
            throw error;
        }
    }
}
