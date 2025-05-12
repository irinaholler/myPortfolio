import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Skills from './components/Skills/Skills';
import Work from './components/Work/Work';
import Portfolio from './components/Portfolio/Portfolio';
import Footer from './components/Footer/Footer';
import Feedback from './components/Feedback/Feedback';
import PlayStats from './components/PlayStats/PlayStats';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MouseFollower from './components/MouseFollower';
import StarterPage from './components/StarterPage/StarterPage';

import css from './styles/App.module.scss';

const App = () => {
  const [playCount, setPlayCount] = useState(0);
  const [musicLovers, setMusicLovers] = useState(0);

  // Load from sessionStorage initially
  useEffect(() => {
    const listeners = sessionStorage.getItem('uniqueListeners');
    if (listeners) setMusicLovers(parseInt(listeners, 10));

    const plays = sessionStorage.getItem('playCount');
    if (plays) setPlayCount(parseInt(plays, 10));
  }, []);

  useEffect(() => {
    const fetchListeners = async () => {
      try {
        const res = await axios.get('/api/radio-clicks/count-unique-users');
        console.log("🎧 Unique listeners data:", res.data);
        setMusicLovers(res.data.totalUsers || 0);
      } catch (err) {
        console.error('Failed to fetch unique listener count:', err);
      }
    };

    fetchListeners();
  }, []);

  // Attach play event listener for counting plays
  useEffect(() => {
    const audioElement = document.getElementById('radioPlayer');
    if (!audioElement) return;

    const handlePlay = () => {
      setPlayCount(prev => {
        const updated = prev + 1;
        sessionStorage.setItem('playCount', updated);
        return updated;
      });
    };

    audioElement.addEventListener('play', handlePlay);

    return () => {
      audioElement.removeEventListener('play', handlePlay);
    };
  }, []);

  return (
    <div className={`bg-primary ${css.container}`}>
      <Router basename="/myPortfolio">
        <Routes>
          <Route path="/" element={
            <>
              <MouseFollower />
              <StarterPage />
              <Header />
              <Hero />
              <Skills />
              <Portfolio />
              <PlayStats playCount={playCount} musicLovers={musicLovers} />
              <Feedback />
              <Footer />
            </>
          } />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
