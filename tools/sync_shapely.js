
import { createClient } from '@supabase/supabase-js';

// Using process.env for Node.js execution
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY must be set.');
    console.error('Usage: node --env-file=.env tools/sync_shapely.js');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Static UUIDs to ensure idempotency
const mockIdeas = [
    {
        title: 'Install bike racks on Main St',
        description: 'We need more bike parking near the library and post office.',
        upvotes: 45,
        shapely_id: '11111111-1111-4111-a111-111111111111',
        category: 'Transportation'
    },
    {
        title: 'Fix potholes on West St',
        description: 'Several large potholes are causing damage to cars.',
        upvotes: 32,
        shapely_id: '22222222-2222-4222-a222-222222222222',
        category: 'Maintenance'
    },
    {
        title: 'Add more benches to the park',
        description: 'Seniors need more places to sit in Chisholm Park.',
        upvotes: 28,
        shapely_id: '33333333-3333-4333-a333-333333333333',
        category: 'Parks'
    },
    {
        title: 'Improve street lighting on Highland Dr',
        description: 'It is too dark at night for pedestrians.',
        upvotes: 15,
        shapely_id: '44444444-4444-4444-a444-444444444444',
        category: 'Safety'
    },
    {
        title: 'Community garden in the north end',
        description: 'Turn the empty lot into a community garden.',
        upvotes: 50,
        shapely_id: '55555555-5555-4555-a555-555555555555',
        category: 'Community'
    }
];

async function syncIdeas() {
    console.log('Starting Shapely sync...');

    for (const idea of mockIdeas) {
        // Check if idea already exists by shapely_id
        const { data: existing, error: fetchError } = await supabase
            .from('issues')
            .select('*')
            .eq('shapely_id', idea.shapely_id)
            .maybeSingle();

        if (fetchError) {
            console.error(`Error checking for idea "${idea.title}":`, fetchError.message);
            continue;
        }

        if (existing) {
            console.log(`Idea "${idea.title}" exists (ID: ${existing.id}). Updating...`);
            // Update upvotes if changed
            const { error: updateError } = await supabase
                .from('issues')
                .update({
                    upvotes: idea.upvotes,
                    title: idea.title, // Sync title in case it changed
                    description: idea.description
                })
                .eq('id', existing.id);

            if (updateError) {
                console.error(`Error updating idea "${idea.title}":`, updateError.message);
            } else {
                console.log(`Updated "${idea.title}"`);
            }
        } else {
            console.log(`Idea "${idea.title}" is new. Inserting...`);
            // Insert new idea
            const { error: insertError } = await supabase
                .from('issues')
                .insert({
                    title: idea.title,
                    description: idea.description,
                    category: idea.category,
                    upvotes: idea.upvotes,
                    shapely_id: idea.shapely_id,
                    status: 'new' // Default status
                });

            if (insertError) {
                console.error(`Error inserting idea "${idea.title}":`, insertError.message);
            } else {
                console.log(`Inserted new idea "${idea.title}"`);
            }
        }
    }

    console.log('Shapely sync complete.');
}

syncIdeas();
