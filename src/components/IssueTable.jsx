import React, { useState, useEffect } from 'react';

const IssueTable = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'created_at', direction: 'desc' });
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showConvertModal, setShowConvertModal] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [projects, setProjects] = useState([]);
    const [convertFormData, setConvertFormData] = useState({
        project_id: '',
        name: '',
        duration_days: 1
    });

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const response = await fetch('/api/issues');
                if (!response.ok) throw new Error('Failed to fetch issues');
                const data = await response.json();
                setIssues(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchIssues();
    }, []);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedIssues = React.useMemo(() => {
        let sortableItems = [...issues];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [issues, sortConfig]);

    const filteredIssues = sortedIssues.filter((issue) => {
        const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
        const matchesSearch =
            (issue.title && issue.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (issue.description && issue.description.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesStatus && matchesSearch;
    });

    const handleOpenConvertModal = (issue) => {
        setSelectedIssue(issue);
        setConvertFormData({
            project_id: '',
            name: issue.title,
            duration_days: 1
        });
        setShowConvertModal(true);
        fetchProjects();
    };

    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/projects');
            if (response.ok) {
                const data = await response.json();
                setProjects(data);
            }
        } catch (err) {
            console.error('Failed to fetch projects', err);
        }
    };

    const handleCloseConvertModal = () => {
        setShowConvertModal(false);
        setSelectedIssue(null);
    };

    const handleConvert = async () => {
        if (!convertFormData.project_id) {
            alert('Please select a project');
            return;
        }

        try {
            // Create Task
            const taskResponse = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    project_id: convertFormData.project_id,
                    name: convertFormData.name,
                    duration_days: convertFormData.duration_days,
                    status: 'pending'
                })
            });

            if (!taskResponse.ok) {
                const err = await taskResponse.json();
                throw new Error(err.error || 'Failed to create task');
            }

            // Update Issue Status
            const issueResponse = await fetch('/api/issues', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: selectedIssue.id,
                    status: 'assigned'
                })
            });

            if (!issueResponse.ok) {
                console.warn('Task created but failed to update issue status');
            } else {
                // Update local state
                setIssues(issues.map(i => i.id === selectedIssue.id ? { ...i, status: 'assigned' } : i));
            }

            alert('Task created successfully!');
            handleCloseConvertModal();
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) return <div className="p-4 text-center">Loading issues...</div>;
    if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>;

    const getStatusColor = (status) => {
        switch (status) {
            case 'open': return 'bg-green-100 text-green-800';
            case 'in_progress': return 'bg-blue-100 text-blue-800';
            case 'closed': return 'bg-gray-100 text-gray-800';
            default: return 'bg-yellow-100 text-yellow-800';
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Issues</h2>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search issues..."
                    className="border p-2 rounded w-full md:w-1/3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    className="border p-2 rounded w-full md:w-1/4"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">All Statuses</option>
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="closed">Closed</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th
                                className="py-2 px-4 border-b text-left cursor-pointer hover:bg-gray-200"
                                onClick={() => handleSort('id')}
                            >
                                ID {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                            </th>
                            <th
                                className="py-2 px-4 border-b text-left cursor-pointer hover:bg-gray-200"
                                onClick={() => handleSort('title')}
                            >
                                Title {sortConfig.key === 'title' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                            </th>
                            <th
                                className="py-2 px-4 border-b text-left cursor-pointer hover:bg-gray-200"
                                onClick={() => handleSort('status')}
                            >
                                Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                            </th>
                            <th
                                className="py-2 px-4 border-b text-left cursor-pointer hover:bg-gray-200"
                                onClick={() => handleSort('priority_score')}
                            >
                                Priority {sortConfig.key === 'priority_score' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                            </th>
                            <th className="py-2 px-4 border-b text-left">Description</th>
                            <th className="py-2 px-4 border-b text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredIssues.map((issue) => (
                            <tr key={issue.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b text-sm text-gray-500">#{issue.id.toString().slice(0,8)}</td>
                                <td className="py-2 px-4 border-b font-medium">{issue.title}</td>
                                <td className="py-2 px-4 border-b">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(issue.status)}`}>
                                        {issue.status}
                                    </span>
                                </td>
                                <td className="py-2 px-4 border-b">{issue.priority_score || 0}</td>
                                <td className="py-2 px-4 border-b text-sm text-gray-600 truncate max-w-xs" title={issue.description}>
                                    {issue.description}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        onClick={() => handleOpenConvertModal(issue)}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        Convert to Task
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredIssues.length === 0 && (
                            <tr>
                                <td colSpan="6" className="py-4 text-center text-gray-500">No issues found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {showConvertModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">Convert to Project Task</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Project</label>
                            <select
                                className="w-full border p-2 rounded"
                                value={convertFormData.project_id}
                                onChange={(e) => setConvertFormData({ ...convertFormData, project_id: e.target.value })}
                            >
                                <option value="">Select Project</option>
                                {projects.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Task Name</label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded"
                                value={convertFormData.name}
                                onChange={(e) => setConvertFormData({ ...convertFormData, name: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Duration (Days)</label>
                            <input
                                type="number"
                                className="w-full border p-2 rounded"
                                value={convertFormData.duration_days}
                                onChange={(e) => setConvertFormData({ ...convertFormData, duration_days: parseInt(e.target.value) || 0 })}
                                min="1"
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={handleCloseConvertModal}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConvert}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Convert
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IssueTable;
