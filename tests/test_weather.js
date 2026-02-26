import { generateWeatherConstraints } from '../src/lib/weather.js';

// Mock Tasks
const tasks = [
    {
        id: 't_outdoor',
        name: 'Paving the road',
        earliest_start: '2024-06-03' // Monday
    },
    {
        id: 't_indoor',
        name: 'Internal Meeting',
        earliest_start: '2024-06-03'
    }
];

// Mock Forecast
const forecast = [
    { date: '2024-06-03', condition: 'Rain' },
    { date: '2024-06-04', condition: 'Sunny' },
    { date: '2024-06-05', condition: 'Sunny' }
];

const constraints = generateWeatherConstraints(forecast, tasks);

console.log('Testing Weather Constraints...');
console.log('Constraints:', JSON.stringify(constraints, null, 2));

if (constraints.length === 1 && constraints[0].task_id === 't_outdoor' && constraints[0].available_date === '2024-06-04') {
    console.log('SUCCESS: Weather constraint correctly generated for outdoor task.');
} else {
    console.error('FAILURE: Weather constraint logic failed.');
}
