import { createClient } from '@supabase/supabase-js';

// Fallback values prevent build/runtime crashes in environments without keys (e.g. CI, local dev)
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://example.com';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'dummy-key';

// Helper to create a Supabase client with request context (for SSR)
export const getSupabase = (request) => {
    const options = {
        auth: {
            persistSession: false,
        },
    };

    if (request) {
        const authHeader = request.headers.get('Authorization');
        if (authHeader) {
            options.global = {
                headers: {
                    Authorization: authHeader,
                },
            };
        }
    }

    return createClient(supabaseUrl, supabaseAnonKey, options);
};

// Default client for browser-side usage or simple queries
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
