// src/App.jsx

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
import { API } from './utils/api';

import css from './styles/App.module.scss';

const App = () => {
  const [playCount, setPlayCount] = useState(0);
  const [musicLovers, setMusicLovers] = useState(0);

  const fetchListeners = async () => {
    try {
      const res = await axios.get(`${API}/api/radio-clicks/count-unique-users`);
      const count = res.data.totalUsers || 0;
      setMusicLovers(count);
      sessionStorage.setItem('uniqueListeners', count);
    } catch (err) {
      console.error('Failed to fetch unique listener count:', err);
    }
  };

  // Load cached values on mount
  useEffect(() => {
    const cachedListeners = sessionStorage.getItem('uniqueListeners');
    if (cachedListeners) {
      setMusicLovers(+cachedListeners);
    }
    const cachedPlays = sessionStorage.getItem('playCount');
    if (cachedPlays) {
      setPlayCount(+cachedPlays);
    }
  }, []);

  // Initial fetch + polling
  useEffect(() => {
    fetchListeners();
    const interval = setInterval(fetchListeners, 10000);
    return () => clearInterval(interval);
  }, []);

  // Track plays and optimistically update both stats
  useEffect(() => {
    const audio = document.getElementById('radioPlayer');
    if (!audio) return;

    const handlePlay = async () => {
      setPlayCount(prev => {
        const next = prev + 1;
        sessionStorage.setItem('playCount', next);
        return next;
      });
      setMusicLovers(prev => {
        const next = prev + 1;
        sessionStorage.setItem('uniqueListeners', next);
        return next;
      });
      await fetchListeners();
    };

    audio.addEventListener('play', handlePlay);
    return () => audio.removeEventListener('play', handlePlay);
  }, []);

  return (
    <div className={`bg-primary ${css.container}`}>
      <Router basename="/portfolio">
        <Routes>
          <Route
            path="/"
            element={
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
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
