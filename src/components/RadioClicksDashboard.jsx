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
    }, [filter, filterValue]);

    const fetchClicks = async () => {
        try {
            setLoading(true);
            let url = '/api/radio-clicks';

            if (filter === 'button' && filterValue) {
                url = `/api/radio-clicks/button/${filterValue}`;
            } else if (filter === 'user' && filterValue) {
                url = `/api/radio-clicks/user/${filterValue}`;
            }

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('adminToken')}`
                }
            });

            setClicks(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch click data. Please check your authentication.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading click data...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="radio-clicks-dashboard">
            <h2>Radio Button Click Analytics</h2>

            <div className="filters">
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
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
                    />
                )}

                <button onClick={fetchClicks}>Apply Filter</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Button ID</th>
                        <th>Clicked By</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {clicks.map((click) => (
                        <tr key={click._id}>
                            <td>{click.buttonId}</td>
                            <td>{click.clickedBy}</td>
                            <td>{format(new Date(click.timestamp), 'PPpp')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {clicks.length === 0 && (
                <p>No click data found.</p>
            )}
        </div>
    );
};

export default RadioClicksDashboard; 