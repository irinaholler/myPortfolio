import React, { useState } from 'react';
import { API } from '../../utils/api';
import './Feedback.scss';

const Feedback = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        design: null,
        content: null,
        navigation: null,
        overall: null,
        comments: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'radio' ? parseInt(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        if (!formData.design || !formData.content || !formData.navigation || !formData.overall) {
            setSubmitStatus('error');
            alert('Please rate all four categories before submitting.');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch(`${API}/api/feedback/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    design: null,
                    content: null,
                    navigation: null,
                    overall: null,
                    comments: ''
                });
                setTimeout(() => {
                    setIsOpen(false);
                    setSubmitStatus(null);
                }, 2000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            setSubmitStatus('error');
            console.error('Error submitting feedback:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <button
                className={`feedback-toggle ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle feedback form"
            >
                <span className="feedback-icon">💭</span>
            </button>

            {isOpen && (
                <div className="feedback-container">
                    <div className="feedback-content">
                        <button
                            className="close-button"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close feedback form"
                        >
                            ×
                        </button>

                        <h2>Share Your Thoughts</h2>
                        <p className="feedback-description">
                            Your feedback helps me improve this portfolio. Feel free to rate different aspects and leave your comments.
                        </p>

                        <form onSubmit={handleSubmit} className="feedback-form">
                            <div className="form-group">
                                <label htmlFor="name">Name (optional)</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email (optional)</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            {['design', 'content', 'navigation', 'overall'].map((field) => (
                                <div className="rating-group" key={field}>
                                    <label>{{
                                        design: 'Design & Layout',
                                        content: 'Content Quality',
                                        navigation: 'Navigation & Usability',
                                        overall: 'Overall Experience'
                                    }[field]}</label>
                                    <div className="rating-input">
                                        {[1, 2, 3, 4, 5].map((value) => (
                                            <label key={value} className="rating-label">
                                                <input
                                                    type="radio"
                                                    name={field}
                                                    value={value}
                                                    checked={formData[field] === value}
                                                    onChange={handleChange}
                                                />
                                                <span className="rating-star">★</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <div className="form-group">
                                <label htmlFor="comments">Additional Comments</label>
                                <textarea
                                    id="comments"
                                    name="comments"
                                    value={formData.comments}
                                    onChange={handleChange}
                                    placeholder="Share your thoughts..."
                                    rows="4"
                                />
                            </div>

                            {submitStatus === 'success' && (
                                <div className="success-message">
                                    Thank you for your feedback! 🙏
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="error-message">
                                    Oops! Something went wrong. Please try again.
                                </div>
                            )}

                            <button
                                type="submit"
                                className="submit-button"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Feedback;
