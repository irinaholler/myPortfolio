import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { API } from '../src/utils/api'; // Ensure this is correctly pointing to your API base URL
import './FeedbackDashboard.scss';

const FeedbackDashboard = () => {
    const [feedback, setFeedback] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('summary'); // 'summary' or 'details'

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    const fetchData = async () => {
        try {
            setLoading(true);
            let response;

            if (activeTab === 'summary') {
                response = await axios.get(`${API}/api/feedback/summary`);
                setSummary(response.data);
            } else {
                response = await axios.get(`${API}/api/feedback`);
                setFeedback(response.data);
            }

            setError(null);
        } catch (err) {
            console.error('Error fetching feedback data:', err);
            setError('Could not load feedback. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="feedback-dashboard">
            <h2>Portfolio Feedback Analytics</h2>

            <div className="tabs">
                <button
                    className={activeTab === 'summary' ? 'active' : ''}
                    onClick={() => setActiveTab('summary')}
                >
                    Summary
                </button>
                <button
                    className={activeTab === 'details' ? 'active' : ''}
                    onClick={() => setActiveTab('details')}
                >
                    Detailed Responses
                </button>
            </div>

            {loading ? (
                <div className="loading">Loading feedback data...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : activeTab === 'summary' && summary ? (
                <div className="summary-container">
                    <div className="summary-card">
                        <h3>Total Responses</h3>
                        <div className="summary-value">{summary.totalResponses}</div>
                    </div>

                    <div className="summary-card">
                        <h3>Design Rating</h3>
                        <div className="summary-value">{summary.avgDesign.toFixed(1)} / 5</div>
                    </div>

                    <div className="summary-card">
                        <h3>Content Rating</h3>
                        <div className="summary-value">{summary.avgContent.toFixed(1)} / 5</div>
                    </div>

                    <div className="summary-card">
                        <h3>Navigation Rating</h3>
                        <div className="summary-value">{summary.avgNavigation.toFixed(1)} / 5</div>
                    </div>

                    <div className="summary-card">
                        <h3>Overall Rating</h3>
                        <div className="summary-value">{summary.avgOverall.toFixed(1)} / 5</div>
                    </div>
                </div>
            ) : (
                <div className="details-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Design</th>
                                <th>Content</th>
                                <th>Navigation</th>
                                <th>Overall</th>
                                <th>Submitted By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedback.map((item) => (
                                <tr key={item._id}>
                                    <td>{format(new Date(item.createdAt), 'MMM d, yyyy')}</td>
                                    <td>{item.design}/5</td>
                                    <td>{item.content}/5</td>
                                    <td>{item.navigation}/5</td>
                                    <td>{item.overall}/5</td>
                                    <td>{item.submittedBy}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {feedback.length === 0 && (
                        <p className="no-data">No feedback data found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default FeedbackDashboard;
