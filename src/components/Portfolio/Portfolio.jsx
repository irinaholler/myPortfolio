import React, { useState } from "react";
import { motion } from "framer-motion";
import css from "./Portfolio.module.scss";
import { fadeIn, staggerChildren, textVariant } from "../../utils/motion.js";

const Portfolio = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ description: "", link: "" });
  const [modalStyle, setModalStyle] = useState({});

  const openModal = (event, description, link) => {
    const projectElement = event.currentTarget; // Get the clicked project element
    const { top, left, width, height } = projectElement.getBoundingClientRect(); // Get position and size

    // Update modal overlay style dynamically
    setModalStyle({
      position: "absolute",
      top: `${top + window.scrollY}px`,
      left: `${left + window.scrollX}px`,
      width: `${width}px`,
      height: `${height}px`,
    });

    // Set modal content
    setModalContent({ description, link });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent({ description: "", link: "" });
    setModalStyle({}); // Reset modal style
  };

  const projects = [
    {
      src: "./prj-mitAussicht.png",
      description: "mitAussicht: WebSite / WordPress / Elementor",
      link: "http://wohnen-mitaussicht.de",
    },
    {
      src: "./prj-Gries GmbH-WS.png",
      description: "Gries GmbH: WebSite / WordPress / Elementor",
      link: "http://www.gries-gmbh.de",
    },
    {
      src: "./prj-DCI.png",
      description: "DCI Project / html / css",
      link: "https://irinaholler.github.io/DCI-Projekt-Kaffee-Welt/",
    },
    {
      src: "./prj-Pokemon.png",
      description: "DCI Project / html / css / JavaScript",
      link: "https://irinaholler.github.io/Pokemon-Project/",
    },
    {
      src: "./prj-Memory-Card-Game.png",
      description: "DCI Project / html / css / JavaScript",
      link: "https://irinaholler.github.io/Memory-Card-Game/",
    },
  ];

  return (
    <motion.section
      variants={staggerChildren}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`paddings ${css.wrapper}`}
    >
      <a className="anchor" id="portfolio"></a>

      <div className={`innerWidth flexCenter ${css.container}`}>
        <motion.div variants={textVariant(0.4)} className={`flexCenter ${css.heading}`}>
          <div className={css.expertiseContainer}>
            <h1 className={css.outlineText}>All Creative Works</h1>
            <h1 className={css.overlayText}>
              <span className={css.gear}>⚙</span> Projects
            </h1>
          </div>

          <a href="https://github.com/irinaholler" target="_blank" rel="noopener noreferrer" className={css.secondaryText}>Explore More Works</a>

        </motion.div>

        <div className={`flexCenter ${css.showCase}`}>
          {projects.map((project, index) => (
            <motion.img
              key={index}
              variants={fadeIn("up", "tween", 0.5 + index * 0.2, 0.6)}
              src={project.src}
              alt={project.description}
              onClick={(event) => openModal(event, project.description, project.link)}
              className={css.projectImage}
            />
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div
          className={css.modalOverlay}
          onClick={closeModal}
          style={modalStyle}
        >
          <div
            className={css.modalContent}
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            <span className={css.closeButton} onClick={closeModal}>&times;</span>
            <p>{modalContent.description}</p>
            <a href={modalContent.link} target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </div>
        </div>
      )}
    </motion.section>
  );
};

export default Portfolio;
