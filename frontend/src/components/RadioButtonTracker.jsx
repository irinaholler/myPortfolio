import React, { useState } from 'react';
import axios from 'axios';
import { API } from '../src/utils/api';

const RadioButtonTracker = ({ buttonId, children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleClick = async () => {
        try {
            setIsLoading(true);

            const userIdentifier = localStorage.getItem('userIdentifier') ||
                `user_${Math.random().toString(36).substring(2, 15)}`;

            if (!localStorage.getItem('userIdentifier')) {
                localStorage.setItem('userIdentifier', userIdentifier);
            }

            await axios.post(`${API}/api/radio-clicks/track`, {
                buttonId,
                clickedBy: userIdentifier
            });

            console.log('Click tracked successfully');
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);

        } catch (error) {
            console.error('Error tracking click:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            onClick={!isLoading ? handleClick : undefined}
            style={{ cursor: isLoading ? 'wait' : 'pointer', opacity: isLoading ? 0.6 : 1 }}
        >
            {children}
            {success && <span style={{ color: 'green', marginLeft: '8px' }}>✓</span>}
        </div>
    );
};

export default RadioButtonTracker;
