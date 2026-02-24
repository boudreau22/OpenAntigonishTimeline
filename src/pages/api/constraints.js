import { getSupabase } from '../../lib/supabase';

export const GET = async ({ request }) => {
    const supabase = getSupabase(request);
    const { data, error } = await supabase
        .from('constraints')
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

        // Validate constraint type
        const validTypes = ['material', 'crew', 'weather', 'approval', 'tender'];
        if (body.type && !validTypes.includes(body.type)) {
             return new Response(JSON.stringify({ error: `Invalid type. Must be one of: ${validTypes.join(', ')}` }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        const { data, error } = await supabase
            .from('constraints')
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
            return new Response(JSON.stringify({ error: 'Constraint ID is required' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        // Validate constraint type if provided in updates
        if (updates.type) {
            const validTypes = ['material', 'crew', 'weather', 'approval', 'tender'];
            if (!validTypes.includes(updates.type)) {
                return new Response(JSON.stringify({ error: `Invalid type. Must be one of: ${validTypes.join(', ')}` }), {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
        }

        const { data, error } = await supabase
            .from('constraints')
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
