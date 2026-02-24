import { getSupabase } from '../../lib/supabase';

export const GET = async ({ request }) => {
    const supabase = getSupabase(request);
    const url = new URL(request.url);
    const taskId = url.searchParams.get('task_id');
    const projectUrl = url.searchParams.get('project_id');

    let query = supabase.from('task_dependencies').select('*');

    if (taskId) {
        query = query.or(`task_id.eq.${taskId},depends_on_task_id.eq.${taskId}`);
    }

    const { data, error } = await query;

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
        // Validation: Ensure both task_id and depends_on_task_id are present
        if (!body.task_id || !body.depends_on_task_id) {
             return new Response(JSON.stringify({ error: 'Missing task_id or depends_on_task_id' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        const { data, error } = await supabase
            .from('task_dependencies')
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

export const DELETE = async ({ request }) => {
    const supabase = getSupabase(request);
    try {
        const body = await request.json();

        if (!body.task_id || !body.depends_on_task_id) {
             return new Response(JSON.stringify({ error: 'Missing task_id or depends_on_task_id' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        const { error } = await supabase
            .from('task_dependencies')
            .delete()
            .match({ task_id: body.task_id, depends_on_task_id: body.depends_on_task_id });

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        return new Response(JSON.stringify({ message: 'Dependency deleted' }), {
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
