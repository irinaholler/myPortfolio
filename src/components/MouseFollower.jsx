import React, { useEffect, useState } from 'react';
import './MouseFollower.scss'; // Import your styles

const MouseFollower = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        // Check if the window width is greater than 768px
        if (!isMobile) {
            const handleMouseMove = (event) => {
                setPosition({ x: event.clientX, y: event.clientY });
            };

            window.addEventListener('mousemove', handleMouseMove);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
            };
        }

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isMobile]);

    return (
        <div
            className="follower"
            style={{
                left: position.x,
                top: position.y,
                display: isMobile ? 'none' : 'block', // Hide on mobile
            }}
        />
    );
};

export default MouseFollower; 