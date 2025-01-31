import React from "react";
import { fadeIn, staggerContainer, slideIn, getMenuStyles, headerVariants } from '../../utils/motion.js';
import css from "./Hero.module.scss";
import { motion } from "framer-motion";


const Hero = () => {
  return (
    <section className={`paddings ${css.wrapper}`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`innerWidth ${css.container}`}
      >

        <a className="anchor" id="me"></a>

        <div className={css.upperElements}>
          <motion.span className="primaryText" variants={fadeIn("right", "tween", 0.2, 1)}>
            <div>
              WELCOME
              <div className={css.centeredText}>
                <span className={css.verticalText}>to my</span>
                FRONT-END
              </div>
              WORLD.
            </div>
          </motion.span>

          <motion.a
            href="mailto:irina@mygrin.de?subject=Let's%20Connect!&body=Hi%20Irina,%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect!"
            className={css.contactButton}
            variants={fadeIn("up", "tween", 0.4, 1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Let's Talk ✉️
          </motion.a>

          <motion.span className="secondaryText" variants={fadeIn("left", "tween", 0.4, 1)}>
            <div className={css.secondaryText}>
              Hello World!
              <br />
              I’m Irina, a web developer, who thrives
              <br />
              on crafting ideas into vibrant digital realities.
              <br />
              Let’s create something extraordinary together!
            </div>
          </motion.span>
        </div>

        <motion.div
          variants={fadeIn("up", "tween", 0.3, 1)}
          className={css.person}
        >
          <motion.img variants={slideIn("up", "tween", 0.5, 1.3)} src="./Irina_Holler.png" alt="IrinaHoller" />
        </motion.div>

        <div className={css.lowerElements}>
          <motion.div variants={fadeIn("right", "tween", 0.3, 1)} className={css.experience}>
            <div className="primaryText">4</div>
            <div className="secondaryText">
              <div>Years</div>
              <div>Experience</div>
            </div>
          </motion.div>

          <motion.div variants={fadeIn("left", "tween", 0.5, 1)} className={css.certificate}>
            <img src="./certificate.png" alt="" />
            <span>CERTIFIED</span>
            <span>MEDIA DESIGNER</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
