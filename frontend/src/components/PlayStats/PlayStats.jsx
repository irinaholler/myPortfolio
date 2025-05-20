import React, { useEffect, useState } from 'react';
import './PlayStats.scss';
import { FaHeart, FaPlay } from 'react-icons/fa';

const PlayStats = ({ playCount, musicLovers }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animation when component mounts
        setIsVisible(true);
        // optionally reset after a bit so future updates retrigger:
        const t = setTimeout(() => setIsVisible(false), 800);
        return () => clearTimeout(t);
    }, [playCount, musicLovers]);

    return (
        <div className={`play-stats ${isVisible ? 'visible' : ''}`}>
            <div className="stat-card plays">
                <div className="stat-icon">
                    <FaPlay />
                </div>
                <div className="stat-content">
                    <div className="stat-value" data-value={playCount}>{playCount}</div>
                    <div className="stat-label">Plays</div>
                </div>
                <div className="stat-decoration"></div>
                <div className="stat-particles">
                    <div className="particle">♪</div>
                    <div className="particle">♫</div>
                    <div className="particle">♬</div>
                </div>
            </div>

            <div className="stat-card lovers">
                <div className="stat-icon">
                    <FaHeart />
                </div>
                <div className="stat-content">
                    <div className="stat-value" data-value={musicLovers}>{musicLovers}</div>
                    <div className="stat-label">Music Lovers</div>
                </div>
                <div className="stat-decoration"></div>
                <div className="stat-particles">
                    <div className="particle">♥</div>
                    <div className="particle">♡</div>
                    <div className="particle">♥</div>
                </div>
            </div>
        </div>
    );
};

export default PlayStats; 