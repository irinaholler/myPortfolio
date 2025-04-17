import React, { useState } from 'react';
import axios from 'axios';

const RadioButtonTracker = ({ buttonId, children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        try {
            setIsLoading(true);

            // Get user identifier (you can customize this)
            const userIdentifier = localStorage.getItem('userIdentifier') ||
                `user_${Math.random().toString(36).substring(2, 15)}`;

            // Store the identifier for future use
            if (!localStorage.getItem('userIdentifier')) {
                localStorage.setItem('userIdentifier', userIdentifier);
            }

            // Send click data to backend
            await axios.post('/api/radio-clicks/track', {
                buttonId,
                clickedBy: userIdentifier
            });

            console.log('Click tracked successfully');
        } catch (error) {
            console.error('Error tracking click:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div onClick={handleClick} style={{ cursor: 'pointer' }}>
            {children}
        </div>
    );
};

export default RadioButtonTracker; 