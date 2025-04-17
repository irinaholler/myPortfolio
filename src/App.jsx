import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Skills from './components/Skills/Skills';
import Work from './components/Work/Work';
import Portfolio from './components/Portfolio/Portfolio';
import Footer from './components/Footer/Footer';
import Feedback from './components/Feedback/Feedback';
import AdminDashboard from './components/Admin/AdminDashboard';
import PlayStats from './components/PlayStats/PlayStats';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MouseFollower from './components/MouseFollower';
import StarterPage from './components/StarterPage/StarterPage';

import css from './styles/App.module.scss';

const App = () => {
  const [playCount, setPlayCount] = useState(2);
  const [musicLovers, setMusicLovers] = useState(0);

  useEffect(() => {
    // Get the music lovers count from session storage
    const listeners = sessionStorage.getItem('uniqueListeners');
    if (listeners) {
      setMusicLovers(parseInt(listeners, 10));
    }

    // Get the play count from session storage
    const plays = sessionStorage.getItem('playCount');
    if (plays) {
      setPlayCount(parseInt(plays, 10));
    }

    // Add event listener for the audio element
    const audioElement = document.getElementById('radioPlayer');
    if (audioElement) {
      audioElement.addEventListener('play', () => {
        const newPlayCount = playCount + 1;
        setPlayCount(newPlayCount);
        sessionStorage.setItem('playCount', newPlayCount);
      });
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener('play', () => { });
      }
    };
  }, [playCount]);

  return (
    <div className={`bg-primary ${css.container}`}>
      <Router basename="/myPortfolio">
        <Routes>
          <Route path="/admin/*" element={<AdminDashboard />} />
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

export default App