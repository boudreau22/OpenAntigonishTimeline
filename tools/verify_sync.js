
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY must be set.');
    console.error('Usage: node --env-file=.env tools/verify_sync.js');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifySync() {
    console.log('Verifying Shapely sync...');

    const { data: issues, error } = await supabase
        .from('issues')
        .select('*')
        .not('shapely_id', 'is', null);

    if (error) {
        console.error('Error fetching issues:', error.message);
        process.exit(1);
    }

    if (issues.length > 0) {
        console.log(`Found ${issues.length} synced issues.`);
        issues.forEach(issue => {
            console.log(`- [${issue.shapely_id}] ${issue.title} (${issue.upvotes} upvotes)`);
        });
    } else {
        console.log('No synced issues found.');
        process.exit(1);
    }
}

verifySync();
