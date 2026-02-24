import React, { useState, useEffect } from 'react';

const TopIdeasFromShapely = () => {
    const [ideas, setIdeas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIdeas = async () => {
            try {
                const response = await fetch('/api/issues');
                if (!response.ok) throw new Error('Failed to fetch ideas');
                const data = await response.json();

                // Filter for ideas (issues with upvotes > 0)
                // In a real integration, this might check for a shapely_id or specific category
                const topIdeas = data.filter(issue => (issue.upvotes || 0) > 0);

                // Sort by upvotes desc
                topIdeas.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));

                setIdeas(topIdeas.slice(0, 5)); // Limit to top 5
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchIdeas();
    }, []);

    if (loading) return <div className="p-4 text-center text-gray-500">Loading ideas...</div>;
    if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Top Community Ideas</h2>
            <div className="space-y-4">
                {ideas.length > 0 ? (
                    ideas.map((idea) => (
                        <div key={idea.id} className="bg-gray-50 p-4 rounded-lg border hover:shadow-sm transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-gray-900 truncate pr-2" title={idea.title}>
                                    {idea.title}
                                </h3>
                                <div className="flex items-center text-orange-500 font-bold whitespace-nowrap">
                                    <span className="mr-1">▲</span>
                                    {idea.upvotes}
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2" title={idea.description}>
                                {idea.description || "No description provided."}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500 py-8">
                        <p>No trending ideas yet.</p>
                        <p className="text-xs mt-2">Submit yours to see it here!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopIdeasFromShapely;
