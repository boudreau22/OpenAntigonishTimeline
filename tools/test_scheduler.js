import { Scheduler } from '../src/lib/scheduler.js';

// Mock Data
const projectId = 'project-1';
const project = { id: projectId, start_date: '2024-01-01' };
const tasks = [
    { id: 't1', project_id: projectId, duration_days: 5 },
    { id: 't2', project_id: projectId, duration_days: 3 },
    { id: 't3', project_id: projectId, duration_days: 2 }
];
const dependencies = [
    { task_id: 't2', depends_on_task_id: 't1' }, // t2 depends on t1
    { task_id: 't3', depends_on_task_id: 't2' }  // t3 depends on t2
];
const constraints = [
    { task_id: 't2', available_date: '2024-01-10' } // t2 cannot start before Jan 10
];

// Mock Supabase Client
const mockSupabase = {
    from: (table) => {
        return {
            select: (cols) => ({
                eq: (col, val) => {
                    // Return a Thenable that also has .single()
                    return {
                        single: () => {
                             if (table === 'projects' && col === 'id' && val === projectId) {
                                return Promise.resolve({ data: project, error: null });
                             }
                             return Promise.resolve({ data: null, error: 'Not found' });
                        },
                        then: (resolve, reject) => {
                             if (table === 'tasks' && col === 'project_id' && val === projectId) {
                                 resolve({ data: tasks, error: null });
                             } else {
                                 resolve({ data: [], error: null });
                             }
                        }
                    };
                },
                in: (col, vals) => {
                    return {
                        then: (resolve, reject) => {
                             if (table === 'task_dependencies') resolve({ data: dependencies, error: null });
                             else if (table === 'constraints') resolve({ data: constraints, error: null });
                             else resolve({ data: [], error: null });
                        }
                    }
                }
            }),
            upsert: (data, opts) => {
                console.log('Upsert called with:', JSON.stringify(data, null, 2));
                return Promise.resolve({ error: null });
            }
        };
    }
};

async function runTest() {
    console.log('Running Scheduler Test...');
    const scheduler = new Scheduler(mockSupabase);
    try {
        const result = await scheduler.calculateSchedule(projectId);
        console.log('Result:', result);

        // Expected Logic Verification
        // t1: ES = 2024-01-01. EF = 2024-01-06.
        // t2: Pred t1 (EF Jan 6). Constraint Jan 10. ES = Jan 10. EF = Jan 13.
        // t3: Pred t2 (EF Jan 13). ES = Jan 13. EF = Jan 15.
        // Project Finish: Jan 15.

        // Backward Pass
        // Project Finish: Jan 15.
        // t3: LF = Jan 15. LS = Jan 13.
        // t2: Successor t3 (LS Jan 13). LF = Jan 13. LS = Jan 10.
        // t1: Successor t2 (LS Jan 10). LF = Jan 10. LS = Jan 5.

    } catch (err) {
        console.error('Test Failed:', err);
    }
}

runTest();
