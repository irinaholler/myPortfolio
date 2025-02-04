import React, { useState, useEffect } from "react";
import { footerVariants, staggerChildren } from '../../utils/motion.js'
import css from "./Footer.module.scss";
import { motion } from 'framer-motion';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentRadio, setCurrentRadio] = useState('');
  const [playCount, setPlayCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const storedPlayCount = localStorage.getItem('playCount');
    if (storedPlayCount) {
      setPlayCount(parseInt(storedPlayCount, 10));
    }

    return () => {
      clearInterval(timer); // Cleanup on unmount
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
    const newPlayCount = playCount + 1;
    setPlayCount(newPlayCount);
    localStorage.setItem('playCount', newPlayCount); // Store updated play count
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
            <label className={css.radioLabel} style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="radio"
                name="menu"
                value="80s80s"
                onChange={() => handleRadioChange('https://streams.80s80s.de/100/mp3-128/streams.80s80s.de/')}
                className={css.radioInput}
              />
              Radio 80s80s
              <div className={css.controls} style={{ marginLeft: '10px' }}>
                <button
                  onClick={handlePlay}
                  className={css.playButton}
                >
                  🎵 {/* Play icon */}
                </button>
                <button
                  onClick={() => {
                    const audio = document.getElementById('radioPlayer');
                    audio.pause();
                  }}
                  className={css.stopButton}
                  style={{ fontSize: '0.8em' }}
                >
                  ⬛ {/* Stop icon */}
                </button>
              </div>
            </label>
            <span className={`${css.secondaryText} ${css.playCount}`}>Play Count: {playCount} ;)</span>
            <audio id="radioPlayer" controls style={{ display: 'none' }}>
              <source src="https://streams.80s80s.de/100/mp3-128/streams.80s80s.de/" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </motion.div>
    </motion.section >
  );
};

export default Footer;
