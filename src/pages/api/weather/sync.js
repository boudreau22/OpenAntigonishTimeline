import { getSupabase } from '../../../lib/supabase';
import { getWeatherForecast, generateWeatherConstraints } from '../../../lib/weather';

export const POST = async ({ request }) => {
    const supabase = getSupabase(request);

    try {
        // Fetch active tasks from active projects
        // Using !inner to filter by project status
        const { data: activeTasks, error: tasksError } = await supabase
            .from('tasks')
            .select(`
                id,
                name,
                earliest_start,
                duration_days,
                status,
                projects!inner(status)
            `)
            .neq('status', 'completed')
            .neq('projects.status', 'completed');

        if (tasksError) throw new Error(`Tasks fetch error: ${tasksError.message}`);

        // Fetch Weather
        // Assuming forecast returns logic for "today" onwards
        const forecast = await getWeatherForecast();

        // Generate Constraints
        // Note: generateWeatherConstraints expects tasks with 'earliest_start'
        const newConstraints = generateWeatherConstraints(forecast, activeTasks);

        if (newConstraints.length > 0) {
            const taskIds = newConstraints.map(c => c.task_id);
            const { data: existingConstraints, error: constError } = await supabase
                .from('constraints')
                .select('*')
                .in('task_id', taskIds)
                .eq('type', 'weather');

            if (constError) throw new Error(`Constraints fetch error: ${constError.message}`);

            const toInsert = [];
            for (const nc of newConstraints) {
                // Check if we already have a constraint for this task with same date
                const exists = existingConstraints.find(ec =>
                    ec.task_id === nc.task_id &&
                    new Date(ec.available_date).toISOString().split('T')[0] === nc.available_date
                );

                if (!exists) {
                    toInsert.push(nc);
                }
            }

            if (toInsert.length > 0) {
                 const { error: insertError } = await supabase
                    .from('constraints')
                    .insert(toInsert);
                 if (insertError) throw new Error(`Insert constraints error: ${insertError.message}`);
            }

            return new Response(JSON.stringify({
                message: 'Weather sync complete',
                forecastDays: forecast.length,
                constraintsAdded: toInsert.length,
                added: toInsert
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
             return new Response(JSON.stringify({
                message: 'Weather sync complete. No new constraints needed.',
                forecastDays: forecast.length
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
