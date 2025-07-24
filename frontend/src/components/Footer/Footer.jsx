import React, { useState, useEffect } from "react";
import axios from 'axios';
import { footerVariants, staggerChildren } from '../../utils/motion.js';
import { API } from '../../utils/api';
import PlayStats from '../PlayStats/PlayStats';
import css from "./Footer.module.scss";
import { motion } from 'framer-motion';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentRadio, setCurrentRadio] = useState('');
  const [playCount, setPlayCount] = useState(0);
  const [uniqueListeners, setUniqueListeners] = useState(0);

  useEffect(() => {
    const plays = sessionStorage.getItem('playCount');
    const listeners = sessionStorage.getItem('uniqueListeners');
    if (plays) setPlayCount(parseInt(plays, 10));
    if (listeners) setUniqueListeners(parseInt(listeners, 10));
  }, []);

  const handlePlay = async () => {
    const audio = document.getElementById('radioPlayer');
    audio.play();

    if (!sessionStorage.getItem('hasListened')) {
      try {
        const userIdentifier = localStorage.getItem('userIdentifier') ||
          `user_${Math.random().toString(36).substring(2, 15)}`;

        if (!localStorage.getItem('userIdentifier')) {
          localStorage.setItem('userIdentifier', userIdentifier);
        }

        await axios.post(`${API}/api/radio-clicks/track`, {
          buttonId: 'radioPlayer',
          clickedBy: userIdentifier
        });

        sessionStorage.setItem('hasListened', 'true');
      } catch (err) {
        console.error('Failed to track listener:', err);
      }
    }
  };

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
          <span className={css.primaryTextSmall} >
            Start by <a href="mailto:irina@myrin.de" style={{ textDecoration: 'none' }} > saying #hi</a>
          </span>
        </div>

        <div className={css.right}>
          <div className={css.info}>
            <span className={`${css.secondaryText}`}>console.log("🚀 Welcome to my world!")</span>
            <span className={`${css.secondaryText} ${css.currentTime}`}>
              {currentTime.toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className={`${css.secondaryText}`}>Made with ❤️ since February 2025</span>
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
