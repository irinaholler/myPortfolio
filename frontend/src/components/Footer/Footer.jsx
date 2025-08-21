import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { footerVariants, staggerChildren } from "../../utils/motion.js";
import { API } from "../../utils/api";
import css from "./Footer.module.scss";
import { motion } from "framer-motion";

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [playCount, setPlayCount] = useState(0);
  const [uniqueListeners, setUniqueListeners] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);

  // restore counters
  useEffect(() => {
    const plays = sessionStorage.getItem("playCount");
    const listeners = sessionStorage.getItem("uniqueListeners");
    if (plays) setPlayCount(parseInt(plays, 10));
    if (listeners) setUniqueListeners(parseInt(listeners, 10));
  }, []);

  // clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // hook audio events to flip UI state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  // play/pause toggle with tracking on first play
  const handleToggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        if (!sessionStorage.getItem("hasListened")) {
          const userIdentifier =
            localStorage.getItem("userIdentifier") ||
            `user_${Math.random().toString(36).substring(2, 15)}`;
          if (!localStorage.getItem("userIdentifier")) {
            localStorage.setItem("userIdentifier", userIdentifier);
          }
          // track once
          await axios.post(`${API}/api/radio-clicks/track`, {
            buttonId: "radioPlayer",
            clickedBy: userIdentifier,
          });
          sessionStorage.setItem("hasListened", "true");
        }
      } catch (err) {
        console.error("Audio play failed:", err);
      }
    } else {
      audio.pause();
    }
  };

  const handleStop = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  };

  return (
    <motion.section
      variants={staggerChildren}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`paddings ${css.wrapper}`}
    >
      <motion.div
        variants={footerVariants}
        className={`innerWidth yPaddings flexCenter ${css.container}`}
      >
        <div className={css.left}>
          <span className="primaryText">
            {"Let's create something "}<br />
            {"amazing together."}
          </span>
          <span className={css.primaryTextSmall}>
            Start by{" "}
            <a href="mailto:irina@myrin.de" style={{ textDecoration: "none" }}>
              saying #hi
            </a>
          </span>
        </div>

        <div className={css.right}>
          <div className={css.info}>
            <span className={css.secondaryText}>
              console.log("🚀 Welcome to my world!")
            </span>
            <span className={`${css.secondaryText} ${css.currentTime}`}>
              {currentTime.toLocaleString("default", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <span className={css.secondaryText}>
              Made with ❤️ since February 2025
            </span>
          </div>

          <div className={css.menu}>
            <h2 className={css.title}>Shall We Enjoy the Music</h2>

            {/* MINI PLAYER */}
            <div
              className={`${css.radioLabel} ${isPlaying ? "isPlaying" : ""}`}
              role="region"
              aria-label="Radio player"
            >
              <div className={css.stationInfo}>
                <div className={css.stationName}>🎶 Radio 80s80s</div>
                <div className={css.subText}>Click play and enjoy the vibes 🎧</div>
              </div>

              <div className={css.controls}>
                <button
                  type="button"
                  onClick={handleToggle}
                  className={css.playButton}
                  aria-controls="radioPlayer"
                  aria-label={isPlaying ? "Pause" : "Play"}
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? "⏸" : "▶"}
                </button>

                <button
                  type="button"
                  onClick={handleStop}
                  className={css.stopButton}
                  aria-controls="radioPlayer"
                  aria-label="Stop"
                  title="Stop"
                >
                  ⏹
                </button>
              </div>

              {/* Equalizer (purely decorative) */}
              <div className={css.equalizer} aria-hidden="true">
                <i></i>
                <i></i>
                <i></i>
              </div>
            </div>

            {/* Hidden audio element */}
            <audio
              id="radioPlayer"
              ref={audioRef}
              preload="none"
              style={{ display: "none" }}
            >
              <source
                src="https://streams.80s80s.de/100/mp3-128/streams.80s80s.de/"
                type="audio/mpeg"
              />
            </audio>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Footer;
