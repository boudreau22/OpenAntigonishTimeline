import React, { useState, useEffect } from 'react';

const PublicIssueList = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const response = await fetch('/api/issues');
                if (!response.ok) throw new Error('Failed to fetch issues');
                const data = await response.json();
                // Filter for operational issues (active ones)
                const activeIssues = data.filter(issue =>
                    issue.status !== 'completed' && issue.status !== 'deferred'
                );
                // Sort by priority score desc, then created_at desc
                activeIssues.sort((a, b) => {
                    if ((b.priority_score || 0) !== (a.priority_score || 0)) {
                        return (b.priority_score || 0) - (a.priority_score || 0);
                    }
                    return new Date(b.created_at) - new Date(a.created_at);
                });
                setIssues(activeIssues.slice(0, 10)); // Limit to top 10
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchIssues();
    }, []);

    if (loading) return <div className="p-4 text-center text-gray-500">Loading issues...</div>;
    if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>;

    const getStatusColor = (status) => {
        switch (status) {
            case 'open': return 'bg-green-100 text-green-800';
            case 'in_progress': return 'bg-blue-100 text-blue-800';
            case 'assigned': return 'bg-purple-100 text-purple-800';
            case 'new': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Operational Issues</h2>
            <div className="overflow-y-auto max-h-[400px]">
                <table className="min-w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                        <tr>
                            <th scope="col" className="px-4 py-3">Title</th>
                            <th scope="col" className="px-4 py-3">Status</th>
                            <th scope="col" className="px-4 py-3 text-right">Priority</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issues.length > 0 ? (
                            issues.map((issue) => (
                                <tr key={issue.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-900 truncate max-w-[150px]" title={issue.title}>
                                        {issue.title}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(issue.status)}`}>
                                            {issue.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        {issue.priority_score || 0}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="px-4 py-3 text-center text-gray-500">No active issues found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PublicIssueList;
