// src/components/Skills/Skills.jsx
import React from "react";
import { comments, sliderSettings } from "../../utils/data.js";
import css from "./Skills.module.scss";
import Slider from "react-slick";
import { motion } from 'framer-motion';
import { footerVariants, staggerChildren } from '../../utils/motion.js';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaWordpress } from "react-icons/fa";
import { SiExpress, SiAdobephotoshop, SiAdobeillustrator, SiElementor } from "react-icons/si";
const skillIcons = {
  html: <FaHtml5 />,
  css: <FaCss3Alt />,
  javascript: <FaJs />,
  react: <FaReact />,
  nodejs: <FaNodeJs />,
  express: <SiExpress />,
  photoshop: <SiAdobephotoshop />,
  illustrator: <SiAdobeillustrator />,
  wordpress: <FaWordpress />,
  elementor: <SiElementor />
};

const Skills = () => {
  return (
    <motion.section
      variants={staggerChildren}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`paddings ${css.wrapper}`}>

      <a className="anchor" id="skills"></a>

      <motion.div
        variants={footerVariants}
        className={`yPaddings innerWidth ${css.container}`}>

        <div className={`yPaddings ${css.skillsContainer}`}>
          <div className={css.skills}>
            <div className={css.expertiseContainer}>
              <h1 className={css.outlineText}>Skillset</h1>
              <h1 className={css.overlayText}>
                <span className={css.gear}>⚙</span> Spotlight
              </h1>
            </div>
            <p>
              Showcasing the tools and tech behind my creativity.
            </p>
            <div className={css.skillsGrid}>
              {["html", "css", "javascript", "react", "nodejs", "express", "wordpress", "elementor", "photoshop", "illustrator"].map((skill, index) => (
                <motion.div
                  key={skill}
                  className={`${css.skillCard} ${css[skill]}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className={css.icon}>{skillIcons[skill]}</div>
                  <span>{skill.charAt(0).toUpperCase() + skill.slice(1)}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className={css.comments}>
          <Slider {...sliderSettings} className={css.slider}>
            {comments.map((comment, i) => {
              return (
                <div className={`flexCenter ${css.comment}`} key={i}>
                  <img src={comment.img} alt="" />
                  <p>{comment.comment}</p>
                  <div className={css.line}></div>
                  <div className={css.bio}>
                    <span>{comment.name}</span>
                    <span>{comment.post}</span>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>

      </motion.div>
    </motion.section>
  );
};

export default Skills;