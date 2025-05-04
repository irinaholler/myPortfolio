import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import css from "./Portfolio.module.scss";
import { fadeIn, staggerChildren, textVariant } from "../../utils/motion.js";
import { projects } from "../../utils/data";

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

  return (
    <motion.section
      variants={staggerChildren}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`paddings ${css.wrapper}`}
    >
      <a className="anchor" id="portfolio"></a>

      <motion.div
        variants={staggerChildren}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`innerWidth flexCenter ${css.container}`}
      >
        <motion.div variants={textVariant(0.4)} className={css.heading}>
          <div className={css.expertiseContainer}>
            <h1 className={css.outlineText}>All Creative Works</h1>
            <h1 className={css.overlayText}>
              <span className={css.gear}>⚙</span> Projects
            </h1>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={css.secondaryText}
          >
            <a
              href="https://github.com/irinaholler"
              target="_blank"
              rel="noopener noreferrer"
              className={css.exploreLink}
            >
              Explore More Works <FaArrowRight className={css.arrowIcon} />
            </a>
          </motion.div>
        </motion.div>

        <div className={`flexCenter ${css.showCase}`}>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={fadeIn("up", "tween", 0.5 + index * 0.2, 0.6)}
              className={css.projectContainer}
            >
              <img
                src={project.img}
                alt={project.name}
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
                <h3>{project.name}</h3>
                <p>{project.description}</p>
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
      </motion.div>

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
