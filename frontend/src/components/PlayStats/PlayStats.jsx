import React, { useEffect, useState } from 'react';
import './PlayStats.scss';
import { FaHeart, FaPlay } from 'react-icons/fa';

const PlayStats = ({ playCount, musicLovers }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only on mount: add the class so the slide-in (or fade-in) animation runs once
        setIsVisible(true);
    }, []);

    return (
        <div className={`play-stats ${isVisible ? 'visible' : ''}`}>
            <div className="stat-card plays">
                <div className="stat-icon">
                    <FaPlay />
                </div>
                <div className="stat-content">
                    <div className="stat-value">{playCount}</div>
                    <div className="stat-label">Plays</div>
                </div>
                <div className="stat-decoration" />
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
                    <div className="stat-value">{musicLovers}</div>
                    <div className="stat-label">Music Lovers</div>
                </div>
                <div className="stat-decoration" />
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
