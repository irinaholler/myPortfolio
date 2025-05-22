import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Skills from './components/Skills/Skills';
import Work from './components/Work/Work';
import Portfolio from './components/Portfolio/Portfolio';
import PlayStats from './components/PlayStats/PlayStats';
import Feedback from './components/Feedback/Feedback';
import Footer from './components/Footer/Footer';
import MouseFollower from './components/MouseFollower';
import StarterPage from './components/StarterPage/StarterPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { API } from './utils/api';
import css from './styles/App.module.scss';

const App = () => {
  const [playCount, setPlayCount] = useState(0);
  const [musicLovers, setMusicLovers] = useState(0);

  // fetch total distinct listeners from server
  const fetchListeners = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API}/api/radio-clicks/count-unique-users`);
      const total = data.totalUsers ?? 0;
      setMusicLovers(total);
      sessionStorage.setItem('uniqueListeners', total);
    } catch (err) {
      console.error('Failed to fetch unique listener count:', err);
    }
  }, []);

  // load cached values on mount
  useEffect(() => {
    setPlayCount(Number(sessionStorage.getItem('playCount')) || 0);
    setMusicLovers(Number(sessionStorage.getItem('uniqueListeners')) || 0);
  }, []);

  // polling every 10s
  useEffect(() => {
    fetchListeners();
    const id = setInterval(fetchListeners, 10000);
    return () => clearInterval(id);
  }, [fetchListeners]);

  // on first play ever for this user, optimistically bump musicLovers
  const handlePlay = useCallback(() => {
    // plays always bumps
    setPlayCount((p) => {
      const next = p + 1;
      sessionStorage.setItem('playCount', next);
      return next;
    });

    // unique listener bump only once per user
    const userId = localStorage.getItem('userIdentifier');
    const countedKey = `counted_${userId}`;
    if (!localStorage.getItem(countedKey)) {
      setMusicLovers((m) => {
        const next = m + 1;
        sessionStorage.setItem('uniqueListeners', next);
        return next;
      });
      localStorage.setItem(countedKey, 'true');
    }

    // fire-and-forget tracking
    axios.post(`${API}/api/radio-clicks/track`, {
      buttonId: 'radioPlayer',
      clickedBy: userId
    }).catch(err => console.error('track error', err));
  }, []);

  // attach to the <audio id="radioPlayer"/>
  useEffect(() => {
    const audio = document.getElementById('radioPlayer');
    if (!audio) return;
    audio.addEventListener('play', handlePlay);
    return () => audio.removeEventListener('play', handlePlay);
  }, [handlePlay]);

  return (
    <div className={`bg-primary ${css.container}`}>
      <Router basename="/portfolio">
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
