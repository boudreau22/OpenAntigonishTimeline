
// This script simulates a webhook payload from Shapely (or triggers a manual sync via the webhook).

const webhookUrl = process.env.WEBHOOK_URL || 'http://localhost:4321/api/webhooks/shapely';
const secret = process.env.SHAPELY_WEBHOOK_SECRET || 'default-secret';

// Mock Data (simulating Shapely payload)
const mockIdeas = [
    {
        title: 'Install bike racks on Main St',
        description: 'We need more bike parking near the library and post office.',
        upvotes: 48, // Updated count
        shapely_id: '11111111-1111-4111-a111-111111111111',
        category: 'Transportation'
    },
    {
        title: 'Fix potholes on West St',
        description: 'Several large potholes are causing damage to cars.',
        upvotes: 35, // Updated count
        shapely_id: '22222222-2222-4222-a222-222222222222',
        category: 'Maintenance'
    },
    {
        title: 'Add more benches to the park',
        description: 'Seniors need more places to sit in Chisholm Park.',
        upvotes: 30, // Updated count
        shapely_id: '33333333-3333-4333-a333-333333333333',
        category: 'Parks'
    },
    {
        title: 'Improve street lighting on Highland Dr',
        description: 'It is too dark at night for pedestrians.',
        upvotes: 18, // Updated count
        shapely_id: '44444444-4444-4444-a444-444444444444',
        category: 'Safety'
    },
    {
        title: 'Community garden in the north end',
        description: 'Turn the empty lot into a community garden.',
        upvotes: 55, // Updated count
        shapely_id: '55555555-5555-4555-a555-555555555555',
        category: 'Community'
    }
];

async function triggerWebhook() {
    console.log(`Triggering webhook at ${webhookUrl}...`);

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-shapely-secret': secret
            },
            body: JSON.stringify(mockIdeas)
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Webhook failed: ${response.status} ${response.statusText} - ${text}`);
        }

        const data = await response.json();
        console.log('Webhook success:', data);
    } catch (err) {
        console.error('Error triggering webhook:', err.message);
        process.exit(1);
    }
}

triggerWebhook();
