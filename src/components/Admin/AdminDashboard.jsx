import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FeedbackDashboard from '../FeedbackDashboard/FeedbackDashboard';
import RadioClicksDashboard from '../RadioClicksDashboard';
import './AdminDashboard.scss';

const AdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('adminToken', data.token);
                setIsAuthenticated(true);
                setError('');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred during login');
            console.error(err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
        setUsername('');
        setPassword('');
    };

    if (!isAuthenticated) {
        return (
            <div className="admin-login">
                <div className="login-container">
                    <h2>Admin Login</h2>

                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="login-button">Login</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <Router>
            <div className="admin-dashboard">
                <header className="admin-header">
                    <h1>Admin Dashboard</h1>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </header>

                <nav className="admin-nav">
                    <Link to="/admin/feedback" className="nav-link">Feedback Analytics</Link>
                    <Link to="/admin/radio-clicks" className="nav-link">Radio Click Analytics</Link>
                </nav>

                <main className="admin-content">
                    <Switch>
                        <Route path="/admin/feedback" component={FeedbackDashboard} />
                        <Route path="/admin/radio-clicks" component={RadioClicksDashboard} />
                        <Route path="/admin" exact>
                            <div className="welcome-message">
                                <h2>Welcome to the Admin Dashboard</h2>
                                <p>Select a section from the navigation menu to view analytics.</p>
                            </div>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    );
};

export default AdminDashboard; 