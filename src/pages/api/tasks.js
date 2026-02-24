import { getSupabase } from '../../lib/supabase';

export const GET = async ({ request }) => {
    const supabase = getSupabase(request);
    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const POST = async ({ request }) => {
    const supabase = getSupabase(request);
    try {
        const body = await request.json();
        const { data, error } = await supabase
            .from('tasks')
            .insert(body)
            .select();

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        return new Response(JSON.stringify(data), {
            status: 201,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};

export const PUT = async ({ request }) => {
    const supabase = getSupabase(request);
    try {
        const body = await request.json();
        const { id, ...updates } = body;

        if (!id) {
            return new Response(JSON.stringify({ error: 'Task ID is required' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        const { data, error } = await supabase
            .from('tasks')
            .update(updates)
            .eq('id', id)
            .select();

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};
