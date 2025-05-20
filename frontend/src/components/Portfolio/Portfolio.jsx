import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import css from "./Portfolio.module.scss";
import { fadeIn, staggerChildren, textVariant } from "../../utils/motion.js";
import { projects } from "../../utils/data.js";

const Portfolio = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ description: "", link: "" });
  const [modalStyle, setModalStyle] = useState({});
  const [expandedProject, setExpandedProject] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const openModal = (event, description, link) => {
    const projectElement = event.currentTarget;
    const { top, left, width, height } = projectElement.getBoundingClientRect();

    setModalStyle({
      position: "absolute",
      top: `${top + window.scrollY}px`,
      left: `${left + window.scrollX}px`,
      width: `${width}px`,
      height: `${height}px`,
    });

    setModalContent({ description, link });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent({ description: "", link: "" });
    setModalStyle({});
  };

  const toggleProjectInfo = (index, event) => {
    event.stopPropagation();
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
            <h1 className={css.outlineText}>Creative Works</h1>
            <h1 className={css.overlayText}>
              <span className={css.gear}>⚙</span> Projects
            </h1>
          </div>

          <motion.div
            className={css.secondaryText}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={css.accordionBox}>
              <div
                className={css.accordionHeader}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <div className={css.headerContent}>
                  <FaGithub className={css.githubIcon} />
                  <span>Explore More Projects</span>
                </div>
                <motion.div
                  className={css.accordionIcon}
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaArrowRight />
                </motion.div>
              </div>

              <motion.div
                className={css.accordionContent}
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: isExpanded ? "auto" : 0,
                  opacity: isExpanded ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className={css.contentWrapper}>
                  <div className={css.statsGrid}>
                    <div className={css.statItem}>
                      <span className={css.statNumber}>15+</span>
                      <span className={css.statLabel}>Projects</span>
                    </div>
                    <div className={css.statItem}>
                      <span className={css.statNumber}>2+</span>
                      <span className={css.statLabel}>Years Experience</span>
                    </div>
                  </div>
                  <p>Check out my latest work and contributions</p>
                  <a
                    href="https://github.com/irinaholler"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={css.viewButton}
                  >
                    <span>View Profile</span>
                    <div className={css.buttonIcon}>
                      <FaGithub />
                    </div>
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <div className={css.showCase}>
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className={css.projectContainer}
            >
              <img src={project.img} alt={project.name} className={css.projectImage} />
              <div className={css.projectInfo}>
                <div className={css.projectHeader}>
                  <h3>{project.name}</h3>
                  {project.tags && (
                    <div className={css.projectTags}>
                      {project.tags.map((tag, index) => (
                        <span key={index} className={css.tag}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <p>{project.description}</p>
                <div className={css.projectFooter}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={css.viewButton}
                  >
                    <span>View Project</span>
                    <div className={css.buttonIcon}>
                      <FaGithub />
                    </div>
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${css.viewButton} ${css.liveButton}`}
                    >
                      <span>Live Demo</span>
                      <div className={css.buttonIcon}>
                        <FaExternalLinkAlt />
                      </div>
                    </a>
                  )}
                </div>
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
            onClick={(e) => e.stopPropagation()}
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
