import React, { useState, useEffect } from 'react';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null); // null for add, object for edit

    const [formData, setFormData] = useState({
        project_id: '',
        name: '',
        duration_days: 1,
        status: 'pending'
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [tasksRes, projectsRes] = await Promise.all([
                fetch('/api/tasks'),
                fetch('/api/projects')
            ]);

            if (!tasksRes.ok || !projectsRes.ok) throw new Error('Failed to fetch data');

            const tasksData = await tasksRes.json();
            const projectsData = await projectsRes.json();

            setTasks(tasksData);
            setProjects(projectsData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (task = null) => {
        if (task) {
            setCurrentTask(task);
            setFormData({
                project_id: task.project_id,
                name: task.name,
                duration_days: task.duration_days,
                status: task.status || 'pending'
            });
        } else {
            setCurrentTask(null);
            setFormData({
                project_id: projects.length > 0 ? projects[0].id : '',
                name: '',
                duration_days: 1,
                status: 'pending'
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentTask(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = currentTask ? 'PUT' : 'POST';
            const body = currentTask ? { id: currentTask.id, ...formData } : formData;

            const response = await fetch('/api/tasks', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (!response.ok) throw new Error('Operation failed');

            await fetchData(); // Refresh list
            handleCloseModal();
        } catch (err) {
            alert(err.message);
        }
    };

    const getProjectName = (id) => {
        const p = projects.find(proj => proj.id === id);
        return p ? p.name : id;
    };

    if (loading) return <div>Loading tasks...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Tasks</h2>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Task
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b text-left">Task</th>
                            <th className="py-2 px-4 border-b text-left">Project</th>
                            <th className="py-2 px-4 border-b text-left">Duration (Days)</th>
                            <th className="py-2 px-4 border-b text-left">Status</th>
                            <th className="py-2 px-4 border-b text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{task.name}</td>
                                <td className="py-2 px-4 border-b text-sm text-gray-600">{getProjectName(task.project_id)}</td>
                                <td className="py-2 px-4 border-b">{task.duration_days}</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                                        {task.status || 'pending'}
                                    </span>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        onClick={() => handleOpenModal(task)}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                         {tasks.length === 0 && (
                            <tr>
                                <td colSpan="5" className="py-4 text-center text-gray-500">No tasks found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">{currentTask ? 'Edit Task' : 'Add New Task'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Project</label>
                                <select
                                    className="w-full border p-2 rounded"
                                    value={formData.project_id}
                                    onChange={(e) => setFormData({...formData, project_id: e.target.value})}
                                    required
                                >
                                    <option value="" disabled>Select Project</option>
                                    {projects.map(p => (
                                        <option key={p.id} value={p.id}>{p.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Task Name</label>
                                <input
                                    type="text"
                                    className="w-full border p-2 rounded"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Duration (Days)</label>
                                <input
                                    type="number"
                                    className="w-full border p-2 rounded"
                                    value={formData.duration_days}
                                    onChange={(e) => setFormData({...formData, duration_days: parseInt(e.target.value) || 0})}
                                    min="1"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Status</label>
                                <select
                                    className="w-full border p-2 rounded"
                                    value={formData.status}
                                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskList;
