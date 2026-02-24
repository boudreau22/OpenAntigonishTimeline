import React, { useState, useEffect } from 'react';

const RecentlyCompleted = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tasksResponse, projectsResponse] = await Promise.all([
                    fetch('/api/tasks'),
                    fetch('/api/projects')
                ]);

                if (!tasksResponse.ok || !projectsResponse.ok) {
                    throw new Error('Failed to fetch data');
                }

                const tasksData = await tasksResponse.json();
                const projectsData = await projectsResponse.json();

                // Create a map of project_id -> project_name
                const projectMap = {};
                projectsData.forEach(p => {
                    projectMap[p.id] = p.name;
                });

                // Filter for completed tasks
                const completedTasks = tasksData.filter(t => t.status === 'completed');

                // Sort by actual_end or updated_at desc
                completedTasks.sort((a, b) => {
                    const dateA = new Date(a.actual_end || a.updated_at);
                    const dateB = new Date(b.actual_end || b.updated_at);
                    return dateB - dateA;
                });

                // Enrich with project name
                const enrichedTasks = completedTasks.map(t => ({
                    ...t,
                    projectName: projectMap[t.project_id] || 'Unknown Project'
                }));

                setTasks(enrichedTasks.slice(0, 5));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="p-4 text-center text-gray-500">Loading recent completions...</div>;
    if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>;

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Recently Completed</h2>
            <div className="relative border-l-2 border-green-200 ml-3 space-y-6">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div key={task.id} className="mb-6 ml-4">
                            <span className="absolute -left-[9px] flex items-center justify-center w-4 h-4 bg-green-200 rounded-full ring-4 ring-white">
                                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                            </span>
                            <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                                {task.name}
                            </h3>
                            <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                                Completed on {formatDate(task.actual_end || task.updated_at)}
                            </time>
                            <p className="text-base font-normal text-gray-500">
                                Project: <span className="font-medium text-gray-700">{task.projectName}</span>
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="ml-4 py-4 text-gray-500">
                        No recently completed tasks. Work is in progress!
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentlyCompleted;
