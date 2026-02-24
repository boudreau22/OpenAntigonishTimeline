import React, { useState, useEffect } from 'react';

const ScheduleSuggestions = () => {
    const [tasks, setTasks] = useState([]);
    const [constraints, setConstraints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [idleOpportunities, setIdleOpportunities] = useState([]);
    const [conflicts, setConflicts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tasksRes, constraintsRes] = await Promise.all([
                    fetch('/api/tasks'),
                    fetch('/api/constraints')
                ]);

                if (!tasksRes.ok || !constraintsRes.ok) throw new Error('Failed to fetch data');

                const tasksData = await tasksRes.json();
                const constraintsData = await constraintsRes.json();

                setTasks(tasksData);
                setConstraints(constraintsData);
                analyzeSchedule(tasksData, constraintsData);
            } catch (err) {
                console.error("Error fetching schedule data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const analyzeSchedule = (tasksData, constraintsData) => {
        // 1. Identify Idle Opportunities (Slack)
        const opportunities = tasksData.filter(task => {
            if (!task.earliest_start || !task.latest_start) return false;
            const es = new Date(task.earliest_start).getTime();
            const ls = new Date(task.latest_start).getTime();
            return ls > es;
        }).map(task => {
            const es = new Date(task.earliest_start);
            const ls = new Date(task.latest_start);
            const slackDays = Math.floor((ls - es) / (1000 * 60 * 60 * 24));
            return {
                ...task,
                slackDays
            };
        });
        setIdleOpportunities(opportunities);

        // 2. Identify Potential Conflicts (Resource Overlap)
        const crewConstraints = constraintsData.filter(c => c.type === 'crew' && c.value);
        const crewMap = {}; // crewName -> [taskIds]

        crewConstraints.forEach(c => {
            if (!crewMap[c.value]) crewMap[c.value] = [];
            crewMap[c.value].push(c.task_id);
        });

        const newConflicts = [];

        Object.entries(crewMap).forEach(([crewName, taskIds]) => {
            const crewTasks = tasksData.filter(t => taskIds.includes(t.id) && t.earliest_start && t.duration_days);

            for (let i = 0; i < crewTasks.length; i++) {
                for (let j = i + 1; j < crewTasks.length; j++) {
                    const t1 = crewTasks[i];
                    const t2 = crewTasks[j];

                    const start1 = new Date(t1.earliest_start).getTime();
                    const end1 = start1 + (t1.duration_days * 24 * 60 * 60 * 1000);

                    const start2 = new Date(t2.earliest_start).getTime();
                    const end2 = start2 + (t2.duration_days * 24 * 60 * 60 * 1000);

                    // Check for overlap
                    if (start1 < end2 && start2 < end1) {
                        newConflicts.push({
                            crew: crewName,
                            tasks: [t1, t2],
                            message: `Crew "${crewName}" is assigned to overlapping tasks.`
                        });
                    }
                }
            }
        });

        setConflicts(newConflicts);
    };

    if (loading) return <div className="p-4 text-center">Analyzing schedule...</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Idle Opportunities Panel */}
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="text-lg font-bold mb-3 text-green-700">Idle Crew Opportunities</h3>
                <p className="text-sm text-gray-600 mb-4">
                    Tasks with slack time that can be delayed without affecting the project finish date.
                </p>
                {idleOpportunities.length === 0 ? (
                    <p className="text-gray-500 italic">No significant slack found.</p>
                ) : (
                    <ul className="space-y-3">
                        {idleOpportunities.map(task => (
                            <li key={task.id} className="border-b pb-2 last:border-0">
                                <div className="font-semibold">{task.name}</div>
                                <div className="text-sm text-gray-600">
                                    {task.slackDays} days of float available.
                                    <br/>
                                    <span className="text-xs">
                                        (ES: {task.earliest_start}, LS: {task.latest_start})
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Conflicts Panel */}
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                <h3 className="text-lg font-bold mb-3 text-red-700">Potential Conflicts</h3>
                <p className="text-sm text-gray-600 mb-4">
                    Resources (Crews) assigned to multiple tasks simultaneously.
                </p>
                {conflicts.length === 0 ? (
                    <p className="text-gray-500 italic">No conflicts detected.</p>
                ) : (
                    <ul className="space-y-3">
                        {conflicts.map((conflict, idx) => (
                            <li key={idx} className="border-b pb-2 last:border-0 bg-red-50 p-2 rounded">
                                <div className="font-semibold text-red-800">{conflict.message}</div>
                                <div className="text-sm text-gray-700 mt-1">
                                    <ul className="list-disc pl-4">
                                        {conflict.tasks.map(t => (
                                            <li key={t.id}>
                                                {t.name} ({t.earliest_start} - {t.duration_days} days)
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ScheduleSuggestions;
