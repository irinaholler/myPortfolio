import React, { useEffect, useState } from 'react';
import './StarterPage.scss';

const StarterPage = () => {
    const [zoomed, setZoomed] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setZoomed(true);
        } else {
            setZoomed(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`starter-page ${zoomed ? 'zoom-in' : ''}`}>
            <img className="full-screen-image" src="./music.png" alt="Music" loading="lazy" />
            <div className="title">
                <h1>GLAD TO HAVE YOU HERE!</h1>
                <h1>IRINA HOLLER | DESIGN. DEVELOP. INSPIRE.</h1>
            </div>
        </div>
    );
};

export default StarterPage;