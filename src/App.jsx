import React from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Skills from './components/Skills/Skills';
import Work from './components/Work/Work';
import Portfolio from './components/Portfolio/Portfolio';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import MouseFollower from './components/MouseFollower';
import StarterPage from './components/StarterPage/StarterPage';

import css from './styles/App.module.scss';

const App = () => {
  return (
    <div className={`bg-primary ${css.container}`}>
      <Router basename="/myPortfolio">
        <MouseFollower />
        <StarterPage />
        <Header />
        <Hero />
        <Skills />
        <Work />
        <Portfolio />
        <Footer />
      </Router>
    </div>
  );
};

export default App