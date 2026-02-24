import React, { useState, useEffect } from 'react';

const ConstraintEditor = () => {
    const [constraints, setConstraints] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentConstraint, setCurrentConstraint] = useState(null);

    const [formData, setFormData] = useState({
        task_id: '',
        type: 'material',
        value: '',
        available_date: ''
    });

    const constraintTypes = ['material', 'crew', 'weather', 'approval', 'tender'];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [constraintsRes, tasksRes] = await Promise.all([
                fetch('/api/constraints'),
                fetch('/api/tasks')
            ]);

            if (!constraintsRes.ok || !tasksRes.ok) throw new Error('Failed to fetch data');

            const constraintsData = await constraintsRes.json();
            const tasksData = await tasksRes.json();

            setConstraints(constraintsData);
            setTasks(tasksData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (constraint = null) => {
        if (constraint) {
            setCurrentConstraint(constraint);
            setFormData({
                task_id: constraint.task_id,
                type: constraint.type,
                value: constraint.value || '',
                available_date: constraint.available_date ? constraint.available_date.split('T')[0] : ''
            });
        } else {
            setCurrentConstraint(null);
            setFormData({
                task_id: tasks.length > 0 ? tasks[0].id : '',
                type: 'material',
                value: '',
                available_date: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentConstraint(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = currentConstraint ? 'PUT' : 'POST';
            const body = currentConstraint ? { id: currentConstraint.id, ...formData } : formData;

            const response = await fetch('/api/constraints', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Operation failed');
            }

            await fetchData();
            handleCloseModal();
        } catch (err) {
            alert(err.message);
        }
    };

    const getTaskName = (id) => {
        const t = tasks.find(task => task.id === id);
        return t ? t.name : id;
    };

    if (loading) return <div>Loading constraints...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Constraints</h2>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Constraint
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b text-left">Task</th>
                            <th className="py-2 px-4 border-b text-left">Type</th>
                            <th className="py-2 px-4 border-b text-left">Value</th>
                            <th className="py-2 px-4 border-b text-left">Date</th>
                            <th className="py-2 px-4 border-b text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {constraints.map((c) => (
                            <tr key={c.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b text-sm text-gray-600">{getTaskName(c.task_id)}</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="px-2 py-1 bg-gray-100 rounded text-xs uppercase font-semibold">
                                        {c.type}
                                    </span>
                                </td>
                                <td className="py-2 px-4 border-b">{c.value}</td>
                                <td className="py-2 px-4 border-b text-sm">
                                    {c.available_date ? new Date(c.available_date).toLocaleDateString() : '-'}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        onClick={() => handleOpenModal(c)}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {constraints.length === 0 && (
                            <tr>
                                <td colSpan="5" className="py-4 text-center text-gray-500">No constraints found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">{currentConstraint ? 'Edit Constraint' : 'Add New Constraint'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Task</label>
                                <select
                                    className="w-full border p-2 rounded"
                                    value={formData.task_id}
                                    onChange={(e) => setFormData({...formData, task_id: e.target.value})}
                                    required
                                >
                                    <option value="" disabled>Select Task</option>
                                    {tasks.map(t => (
                                        <option key={t.id} value={t.id}>{t.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Type</label>
                                <select
                                    className="w-full border p-2 rounded"
                                    value={formData.type}
                                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                                    required
                                >
                                    {constraintTypes.map(type => (
                                        <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Value (e.g. Crew Name, Material Type)</label>
                                <input
                                    type="text"
                                    className="w-full border p-2 rounded"
                                    value={formData.value}
                                    onChange={(e) => setFormData({...formData, value: e.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Available Date</label>
                                <input
                                    type="date"
                                    className="w-full border p-2 rounded"
                                    value={formData.available_date}
                                    onChange={(e) => setFormData({...formData, available_date: e.target.value})}
                                />
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

export default ConstraintEditor;
