import { getSupabase } from '../../../lib/supabase';

export const POST = async ({ request }) => {
    try {
        // Validate Secret
        const secret = request.headers.get('x-shapely-secret');
        const envSecret = import.meta.env.SHAPELY_WEBHOOK_SECRET || 'default-secret';

        if (secret !== envSecret) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const body = await request.json();
        const ideas = Array.isArray(body) ? body : (body.ideas || []);

        if (ideas.length === 0) {
             return new Response(JSON.stringify({ message: 'No ideas to sync' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
             });
        }

        const supabase = getSupabase(request);
        const results = [];

        for (const idea of ideas) {
            if (!idea.shapely_id) {
                results.push({ title: idea.title || 'Unknown', error: 'Missing shapely_id' });
                continue;
            }

            // Upsert Logic
            const { data: existing, error: fetchError } = await supabase
                .from('issues')
                .select('id')
                .eq('shapely_id', idea.shapely_id)
                .maybeSingle();

            if (fetchError) {
                results.push({ title: idea.title, error: fetchError.message });
                continue;
            }

            if (existing) {
                 const { error } = await supabase
                    .from('issues')
                    .update({
                        title: idea.title,
                        description: idea.description,
                        upvotes: idea.upvotes,
                        // category might be missing in update if not provided
                    })
                    .eq('id', existing.id);

                 results.push({ title: idea.title, action: 'updated', error: error ? error.message : null });
            } else {
                 const { error } = await supabase
                    .from('issues')
                    .insert({
                        title: idea.title,
                        description: idea.description,
                        category: idea.category || 'General',
                        upvotes: idea.upvotes || 0,
                        shapely_id: idea.shapely_id,
                        status: 'new'
                    });

                 results.push({ title: idea.title, action: 'inserted', error: error ? error.message : null });
            }
        }

        return new Response(JSON.stringify({
            message: 'Sync complete',
            processed: ideas.length,
            results
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
