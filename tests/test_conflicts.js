
import { Scheduler } from '../src/lib/scheduler.js';

// Mock Supabase
const mockSupabase = {
    from: (table) => {
        return {
            select: (cols) => ({
                eq: (col, val) => ({
                    single: () => Promise.resolve({ data: { id: 'p1', start_date: '2024-01-01' }, error: null }),
                    then: (resolve) => resolve({ data: [], error: null }) // Fallback
                }),
                neq: (col, val) => ({
                    neq: (col2, val2) => Promise.resolve({
                        data: [
                            {
                                id: 't_other',
                                name: 'Other Project Task',
                                project_id: 'p2',
                                earliest_start: '2024-01-05',
                                duration_days: 5, // Ends Jan 10
                                required_resources: ['Excavator'],
                                projects: { name: 'Project B', status: 'in_progress' }
                            }
                        ],
                        error: null
                    })
                }),
                in: (col, vals) => Promise.resolve({ data: [], error: null })
            }),
            upsert: (data) => Promise.resolve({ error: null })
        };
    }
};

async function testConflicts() {
    console.log('Testing Conflict Detection...');
    const scheduler = new Scheduler(mockSupabase);

    // Mock "Current Project" Tasks
    // Task A: Starts Jan 6, Ends Jan 8. Uses Excavator.
    // Overlap with Other Task (Jan 5 - Jan 10).
    const currentTasks = [
        {
            id: 't_current',
            name: 'Current Task',
            start: new Date('2024-01-06').getTime(),
            end: new Date('2024-01-08').getTime(),
            required_resources: ['Excavator']
        }
    ];

    const conflicts = await scheduler.detectResourceConflicts('p1', currentTasks);

    console.log('Conflicts found:', JSON.stringify(conflicts, null, 2));

    if (conflicts.length === 1 && conflicts[0].resource === 'Excavator') {
        console.log('SUCCESS: Conflict correctly detected.');
    } else {
        console.error('FAILURE: Conflict not detected as expected.');
    }
}

testConflicts();
