
// Mock Weather Service
// In a real app, this would fetch from OpenWeatherMap or similar.

export async function getWeatherForecast(location = 'Antigonish, NS') {
    // Return a 7-day forecast starting from today
    const today = new Date();
    const forecast = [];

    // Simulate some bad weather
    // Let's say it rains in 2 days and 5 days
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        let condition = 'Sunny';
        if (i === 2) condition = 'Rain';
        if (i === 5) condition = 'Heavy Rain';

        forecast.push({
            date: date.toISOString().split('T')[0],
            condition,
            temp: 20 - i // getting cooler?
        });
    }

    return forecast;
}

export function generateWeatherConstraints(forecast, tasks) {
    const constraints = [];

    tasks.forEach(task => {
        // Only care about outdoor tasks
        // Basic keyword matching for now
        const outdoorKeywords = ['paving', 'road', 'construction', 'sewer', 'trail', 'concrete', 'roof'];
        const isOutdoor = outdoorKeywords.some(k =>
            (task.name && task.name.toLowerCase().includes(k)) ||
            (task.description && task.description.toLowerCase().includes(k))
        );

        if (!isOutdoor) return;

        // Check if task is scheduled during bad weather
        // We use 'earliest_start' and duration to estimate window
        // But for constraint creation, we just want to flag days that are bad.
        // A 'weather' constraint usually means "Cannot work on this day".
        // The scheduler treats constraints as "Start No Earlier Than".
        // If we want to block a specific day, the scheduler needs to be more sophisticated (resource calendar).
        // Our simplified scheduler uses `available_date` (Start Date).
        // So if rain is on Day X, and task *wants* to start on Day X, we push it to Day X+1.

        // Strategy:
        // Iterate through forecast.
        // If Bad Weather on Date D:
        // Find tasks that might be running on Date D.
        // Create a constraint: "Weather Delay: Rain on [Date D]".
        // Set available_date to Date D + 1.
        // But this only helps if the task hasn't started yet.

        // Simpler Strategy for this MVP:
        // If a task's *earliest_start* aligns with bad weather, push it.

        if (!task.earliest_start) return;

        const taskStart = new Date(task.earliest_start).toISOString().split('T')[0];

        // Find forecast for start date
        const dayForecast = forecast.find(f => f.date === taskStart);

        if (dayForecast && (dayForecast.condition === 'Rain' || dayForecast.condition === 'Heavy Rain')) {
            // Bad weather on start date!
            // Constraint: Available next day (or next good day).
            // Let's just push it by 1 day for now.

            // Find next good day?
            let nextGoodDay = null;
            const startIndex = forecast.findIndex(f => f.date === taskStart);
            if (startIndex !== -1) {
                for (let i = startIndex + 1; i < forecast.length; i++) {
                    if (forecast[i].condition !== 'Rain' && forecast[i].condition !== 'Heavy Rain') {
                        nextGoodDay = forecast[i].date;
                        break;
                    }
                }
            }

            if (nextGoodDay) {
                constraints.push({
                    task_id: task.id,
                    type: 'weather',
                    description: `Weather delay due to ${dayForecast.condition} on ${taskStart}`,
                    available_date: nextGoodDay
                });
            }
        }
    });

    return constraints;
}
