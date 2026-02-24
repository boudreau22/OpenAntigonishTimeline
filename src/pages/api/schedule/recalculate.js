import { getSupabase } from '../../../lib/supabase';
import { Scheduler } from '../../../lib/scheduler';

export const POST = async ({ request }) => {
    const supabase = getSupabase(request);
    const scheduler = new Scheduler(supabase);

    try {
        const url = new URL(request.url);
        const projectId = url.searchParams.get('project_id');

        let projects = [];

        if (projectId) {
            projects = [{ id: projectId }];
        } else {
             // Fetch all active projects
             const { data, error } = await supabase
                .from('projects')
                .select('id')
                .neq('status', 'completed');

             if (error) throw new Error(error.message);
             projects = data;
        }

        const results = [];
        for (const p of projects) {
            try {
                const result = await scheduler.calculateSchedule(p.id);
                results.push({ projectId: p.id, success: true, ...result });
            } catch (e) {
                console.error(`Failed to recalculate project ${p.id}:`, e);
                results.push({ projectId: p.id, success: false, error: e.message });
            }
        }

        return new Response(JSON.stringify({
            message: 'Schedule recalculation completed',
            results
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};
