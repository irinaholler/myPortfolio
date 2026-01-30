import React, { useState, useCallback, useMemo } from "react";
import { FaExternalLinkAlt, FaBrain, FaRobot } from "react-icons/fa";
import { SiOpenai, SiGooglesheets } from "react-icons/si";
import css from "./AIAutomation.module.scss";
import { aiAutomationProjects } from "../../utils/data.js";
import WorkflowDiagram from "./WorkflowDiagram";

const AIAutomation = () => {
    const [selectedWorkflow, setSelectedWorkflow] = useState(null);
    const [expandedProject, setExpandedProject] = useState(null);

    const toggleWorkflow = useCallback((projectIndex, workflowIndex) => {
        const key = `${projectIndex}-${workflowIndex}`;
        setExpandedProject(prev => prev === key ? null : key);
    }, []);

    const openWorkflowModal = useCallback((workflow) => {
        setSelectedWorkflow(workflow);
    }, []);

    const closeWorkflowModal = useCallback(() => {
        setSelectedWorkflow(null);
    }, []);

    const getTechIcon = useCallback((tech) => {
        const iconMap = {
            "OpenAI": <SiOpenai />,
            "Google Sheets": <SiGooglesheets />,
            "LLM": <FaBrain />,
            "n8n": <FaRobot />,
            "MCPs": <FaRobot />,
            "Pinecone": <FaBrain />
        };
        return iconMap[tech] || <FaBrain />;
    }, []);

    // Memoize projects to prevent unnecessary re-renders
    const memoizedProjects = useMemo(() => aiAutomationProjects, []);

    return (
        <section className={`paddings ${css.wrapper}`}>
            <a className="anchor" id="ai-automation"></a>

            <div className={`innerWidth flexCenter ${css.container}`}>
                <div className={css.heading}>
                    <div className={css.expertiseContainer}>
                        <h1 className={css.outlineText}>AI Automation</h1>
                        <h1 className={css.overlayText}>
                            <span className={css.gear}>⚡</span> Intelligent Workflows
                        </h1>
                    </div>
                </div>

                <div className={css.showCase}>
                    {memoizedProjects.map((project, i) => {
                        return (
                            <div
                                key={`project-${i}-${project.name}`}
                                className={css.projectContainer}
                            >
                                <div className={css.projectContent}>
                                    <div className={css.workflowSection}>
                                        {project.workflows && project.workflows.length > 0 && (
                                            <WorkflowDiagram
                                                workflows={project.workflows}
                                                onWorkflowClick={openWorkflowModal}
                                                projectIndex={i}
                                                expandedWorkflow={expandedProject}
                                                onToggle={toggleWorkflow}
                                            />
                                        )}
                                    </div>

                                    <div className={css.projectInfo}>
                                        <div className={css.projectHeader}>
                                            <h3>{project.name}</h3>
                                            {project.technologies && (
                                                <div className={css.techStack}>
                                                    {project.technologies.map((tech, index) => (
                                                        <span key={index} className={css.techBadge} title={tech}>
                                                            {getTechIcon(tech)}
                                                            <span className={css.techName}>{tech}</span>
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <p className={css.description}>{project.description}</p>

                                        {project.features && (
                                            <div className={css.featuresList}>
                                                <h4>Key Features:</h4>
                                                <ul>
                                                    {project.features.map((feature, index) => (
                                                        <li key={index}>{feature}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        <div className={css.projectFooter}>
                                            {project.caseStudy && (
                                                <a
                                                    href={project.caseStudy}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={css.viewButton}
                                                >
                                                    <span>View Full Case Study</span>
                                                    <div className={css.buttonIcon}>
                                                        <FaExternalLinkAlt />
                                                    </div>
                                                </a>
                                            )}
                                            {project.link && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`${css.viewButton} ${css.secondaryButton}`}
                                                >
                                                    <span>View Project</span>
                                                    <div className={css.buttonIcon}>
                                                        <FaExternalLinkAlt />
                                                    </div>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {selectedWorkflow && (
                <div className={css.modalOverlay} onClick={closeWorkflowModal}>
                    <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
                        <span className={css.closeButton} onClick={closeWorkflowModal}>&times;</span>
                        <h3>{selectedWorkflow.name}</h3>
                        {selectedWorkflow.diagram && (
                            <img
                                src={selectedWorkflow.diagram}
                                alt={selectedWorkflow.name}
                                className={css.modalImage}
                                loading="lazy"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    console.warn(`Failed to load modal image: ${selectedWorkflow.diagram}`);
                                }}
                            />
                        )}
                        <p>{selectedWorkflow.description}</p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default AIAutomation;
