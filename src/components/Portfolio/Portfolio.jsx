import React, { useState } from "react";
import { motion } from "framer-motion";
import css from "./Portfolio.module.scss";
import { fadeIn, staggerChildren, textVariant } from "../../utils/motion.js";

const Portfolio = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ description: "", link: "" });
  const [modalStyle, setModalStyle] = useState({});
  const [expandedProject, setExpandedProject] = useState(null);

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

  const toggleProjectInfo = (index, event) => {
    event.stopPropagation(); // Prevent triggering the modal
    setExpandedProject(expandedProject === index ? null : index);
  };

  const projects = [
    {
      src: "./prj-mitAussicht.png",
      title: "mitAussicht",
      description: "WebSite / WordPress / Elementor",
      details: "A modern real estate website showcasing properties with beautiful views. Built with WordPress and Elementor for easy content management.",
      link: "http://wohnen-mitaussicht.de",
    },
    {
      src: "./prj-Gries GmbH-WS.png",
      title: "Gries GmbH",
      description: "WebSite / WordPress / Elementor",
      details: "Corporate website for Gries GmbH featuring company services, portfolio, and contact information. Responsive design optimized for all devices.",
      link: "http://www.gries-gmbh.de",
    },
    {
      src: "./prj-connectify.png",
      title: "Connectify",
      description: "MERN Fullstack Social Platform",
      details: "A modern social platform built with the MERN stack (MongoDB, Express, React, Node.js), Tailwind CSS, and Vite. Features a beautiful purple-blue gradient design, user authentication, story sharing, writer connections, and an inspiring community space. Includes dark mode and responsive design.",
      link: "https://echowords.onrender.com/welcome",
    },
    {
      src: "./prj-DCI.png",
      title: "DCI Project",
      description: "html / css",
      details: "A coffee world themed website showcasing different coffee types and brewing methods. Built with pure HTML and CSS for clean, semantic markup.",
      link: "https://irinaholler.github.io/DCI-Projekt-Kaffee-Welt/",
    },
    {
      src: "./prj-Pokemon.png",
      title: "Pokemon Project",
      description: "html / css / JavaScript",
      details: "Interactive Pokemon card game with dynamic content loading and user interactions. Features search, filtering, and detailed Pokemon information.",
      link: "https://irinaholler.github.io/Pokemon-Project/",
    },
    {
      src: "./prj-Memory-Card-Game.png",
      title: "Memory Card Game",
      description: "html / css / JavaScript",
      details: "Classic memory card game with modern design and animations. Includes score tracking, timer, and difficulty levels for an engaging user experience.",
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
            <motion.div
              key={index}
              variants={fadeIn("up", "tween", 0.5 + index * 0.2, 0.6)}
              className={css.projectContainer}
            >
              <img
                src={project.src}
                alt={project.title}
                onClick={(event) => openModal(event, project.description, project.link)}
                className={css.projectImage}
              />
              <div
                className={css.projectInfo}
                style={{
                  opacity: expandedProject === index ? 1 : 0,
                  transform: expandedProject === index ? 'translateY(0)' : 'translateY(100%)',
                  pointerEvents: expandedProject === index ? 'auto' : 'none'
                }}
              >
                <h3>{project.title}</h3>
                <p>{project.details}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={css.viewButton}
                  onClick={(e) => e.stopPropagation()}
                >
                  View Project
                </a>
              </div>
              <div
                className={css.infoToggle}
                onClick={(e) => toggleProjectInfo(index, e)}
              >
                {expandedProject === index ? '−' : '+'}
              </div>
            </motion.div>
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
