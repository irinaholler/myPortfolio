import React, { useState, useEffect } from "react";
import { footerVariants, staggerChildren } from '../../utils/motion.js'
import css from "./Footer.module.scss";
import { motion } from 'framer-motion';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentRadio, setCurrentRadio] = useState('');
  const [playCount, setPlayCount] = useState(2);
  const [uniqueListeners, setUniqueListeners] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const listeners = sessionStorage.getItem('uniqueListeners');
    if (listeners) {
      setUniqueListeners(parseInt(listeners, 10));
    }

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleRadioChange = (radioSrc) => {
    const audio = document.getElementById('radioPlayer');
    audio.pause();
    audio.src = radioSrc;
    audio.play();
  };

  const handlePlay = () => {
    const audio = document.getElementById('radioPlayer');
    audio.play();

    if (!sessionStorage.getItem('hasListened')) {
      const newCount = uniqueListeners + 1;
      setUniqueListeners(newCount);
      sessionStorage.setItem('uniqueListeners', newCount);
      sessionStorage.setItem('hasListened', 'true');
    }
  };

  return (
    <motion.section
      variants={staggerChildren}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`paddings ${css.wrapper}`}>

      <motion.div
        variants={footerVariants}
        className={`innerWidth yPaddings flexCenter ${css.container}`}>
        <div className={css.left}>
          <span className="primaryText">
            Let's create something <br />
            amazing together.
          </span>
          <span className="primaryText">
            Start by <a href="mailto:irina@myrin.de" style={{ textDecoration: 'none' }} > saying #hi</a>
          </span>
        </div>

        <div className={css.right}>
          <div className={css.info}>
            <span className={`${css.secondaryText}`}>console.log("🚀 Welcome to my world!")</span>
            <span className={`${css.secondaryText} ${css.currentTime}`}>
              {currentTime.toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className={`${css.secondaryText}`}>Made with ❤️ in February 2025</span>
          </div>
          <div className={css.menu}>
            <h2 className={css.title}>Shall We Enjoy the Music</h2>
            <div className={css.radioLabel}>
              <span className={css.stationName}>Radio 80s80s</span>
              <div className={css.controls}>
                <button
                  onClick={handlePlay}
                  className={css.playButton}
                  title="Play"
                >
                  🎵
                </button>
                <button
                  onClick={() => {
                    const audio = document.getElementById('radioPlayer');
                    audio.pause();
                  }}
                  className={css.stopButton}
                  title="Stop"
                >
                </button>
              </div>
            </div>
            <div className={css.playCount}>
              <span className={css.countLabel}>Play Count</span>
              <span className={css.count}>{playCount}</span>
              <span className={css.userCount}>{uniqueListeners} music lovers</span>
            </div>
            <audio id="radioPlayer" controls style={{ display: 'none' }}>
              <source src="https://streams.80s80s.de/100/mp3-128/streams.80s80s.de/" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Footer;
