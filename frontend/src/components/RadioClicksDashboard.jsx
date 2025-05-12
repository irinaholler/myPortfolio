import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import '../styles/RadioClicksDashboard.scss';

const RadioClicksDashboard = () => {
    const [clicks, setClicks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all'); // 'all', 'button', 'user'
    const [filterValue, setFilterValue] = useState('');

    useEffect(() => {
        fetchClicks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, filterValue]);

    const fetchClicks = async () => {
        try {
            setLoading(true);
            let url = '/api/radio-clicks';

            if (filter === 'button' && filterValue.trim()) {
                url = `/api/radio-clicks/button/${filterValue}`;
            } else if (filter === 'user' && filterValue.trim()) {
                url = `/api/radio-clicks/user/${filterValue}`;
            }

            const response = await axios.get(url);
            setClicks(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching radio click data:', err);
            setError('Failed to fetch click data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="radio-clicks-dashboard">
            <h2 className="text-2xl font-bold mb-4">Radio Button Click Analytics</h2>

            <div className="filters mb-6 flex flex-wrap items-center gap-4">
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded"
                >
                    <option value="all">All Clicks</option>
                    <option value="button">Filter by Button</option>
                    <option value="user">Filter by User</option>
                </select>

                {filter !== 'all' && (
                    <input
                        type="text"
                        placeholder={`Enter ${filter} ID...`}
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded"
                    />
                )}

                <button
                    onClick={fetchClicks}
                    className="px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                    Apply Filter
                </button>
            </div>

            {loading ? (
                <p>Loading click data...</p>
            ) : error ? (
                <p className="text-red-600">{error}</p>
            ) : clicks.length === 0 ? (
                <p>No click data found.</p>
            ) : (
                <table className="w-full text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Button ID</th>
                            <th className="border border-gray-300 px-4 py-2">Clicked By</th>
                            <th className="border border-gray-300 px-4 py-2">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clicks.map((click) => (
                            <tr key={click._id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{click.buttonId}</td>
                                <td className="border border-gray-300 px-4 py-2">{click.clickedBy}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {format(new Date(click.timestamp), 'PPpp')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default RadioClicksDashboard;
