import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import css from "./WorkflowDiagram.module.scss";

const WorkflowDiagram = ({ workflows, onWorkflowClick, projectIndex, expandedWorkflow, onToggle }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [imageErrors, setImageErrors] = useState(new Set());

  const handleMouseEnter = useCallback((index) => {
    setHoveredIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  const handleWorkflowClick = useCallback((workflow) => {
    if (onWorkflowClick) {
      onWorkflowClick(workflow);
    }
  }, [onWorkflowClick]);

  const handleImageError = useCallback((workflowIndex, diagram) => {
    setImageErrors(prev => new Set(prev).add(workflowIndex));
    console.warn(`Failed to load image: ${diagram}`);
  }, []);

  const memoizedWorkflows = useMemo(() => workflows || [], [workflows]);

  return (
    <div className={css.workflowContainer}>
      <h4 className={css.workflowTitle}>Workflow Diagrams</h4>
      <div className={css.workflowsList}>
        {memoizedWorkflows.map((workflow, index) => {
          const key = `${projectIndex}-${index}`;
          const isExpanded = expandedWorkflow === key;
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={key}
              className={css.workflowItem}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={css.workflowHeader}
                onClick={() => onToggle && onToggle(projectIndex, index)}
              >
                <span className={css.workflowName}>{workflow.name}</span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown className={css.expandIcon} />
                </motion.div>
              </div>

              <motion.div
                className={css.workflowContent}
                initial={false}
                animate={{
                  height: isExpanded ? "auto" : 0,
                  opacity: isExpanded ? 1 : 0,
                  display: isExpanded ? "block" : "none"
                }}
                transition={{ 
                  duration: 0.3, 
                  ease: "easeInOut",
                  height: { duration: 0.3, ease: "easeInOut" },
                  opacity: { duration: 0.2 }
                }}
                style={{ overflow: "hidden" }}
              >
                {workflow.diagram && (
                  <div className={css.diagramWrapper}>
                    {!imageErrors.has(index) ? (
                      <>
                        <img
                          src={workflow.diagram}
                          alt={workflow.name}
                          className={css.workflowImage}
                          onClick={() => handleWorkflowClick(workflow)}
                          loading="lazy"
                          decoding="async"
                          onError={() => handleImageError(index, workflow.diagram)}
                        />
                        <div className={css.imageOverlay}>
                          <span className={css.viewFullText}>Click to view full size</span>
                        </div>
                      </>
                    ) : (
                      <div className={css.imagePlaceholder}>
                        <div className={css.placeholderIcon}>📊</div>
                        <div className={css.placeholderText}>Workflow Diagram</div>
                        <div className={css.placeholderSubtext}>
                          {workflow.diagram.split('/').pop()}
                        </div>
                        <div className={css.placeholderHint}>
                          Please add this image to the public folder
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {workflow.description && (
                  <p className={css.workflowDescription}>{workflow.description}</p>
                )}
              </motion.div>

              {isHovered && (
                <motion.div
                  className={css.connectionLine}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkflowDiagram;
