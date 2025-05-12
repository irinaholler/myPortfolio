import React, { useEffect, useState } from 'react';
import './StarterPage.scss';

const StarterPage = () => {
    const [zoomed, setZoomed] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        // Set loaded state after a short delay to ensure animations start properly
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);

        const handleScroll = () => {
            const position = window.scrollY;
            setScrollPosition(position);

            if (position > 0) {
                setZoomed(true);
            } else {
                setZoomed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
    }, []);

    // Calculate scale based on scroll position
    const getScale = () => {
        if (scrollPosition <= 0) return 1;
        // Scale from 1 to 1.8 as user scrolls down
        const scale = 1 + (scrollPosition / 500) * 0.8;
        return Math.min(scale, 1.8); // Cap at 1.8
    };

    return (
        <div className={`starter-page ${zoomed ? 'zoom-in' : ''} ${isLoaded ? 'loaded' : ''}`}>
            <img
                className="full-screen-image"
                src="./music.png"
                alt="Music"
                loading="lazy"
                style={{ transform: `scale(${getScale()})` }}
            />
            <div
                className="title"
                style={{
                    transform: `translate(-15%, -50%) scale(${getScale()})`,
                    transition: 'transform 0.3s ease-out'
                }}
            >
                <h1>GLAD TO HAVE YOU HERE!</h1>
                <h1>IRINA HOLLER | DESIGN. DEVELOP. INSPIRE.</h1>
            </div>
        </div>
    );
};

export default StarterPage;