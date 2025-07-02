import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import css from './CVViewer.module.scss';

const modalVariants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: {
        opacity: 1,
        scale: [0.7, 1.05, 1], // start small → overshoot → settle
        transition: {
            duration: 0.6,
            ease: 'easeInOut',
        },
    },
    exit: {
        opacity: 0,
        scale: 0.7,
        transition: { duration: 0.3 },
    },
};

const CVViewer = ({ onClose }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    return createPortal(
        <motion.div
            className={css.overlay}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
        >
            <motion.div
                className={css.content}
                onClick={e => e.stopPropagation()}
            >
                <button className={css.closeButton} onClick={onClose}>
                    ×
                </button>
                <div className={css.imageWrapper}>
                    {imageError ? (
                        <div className={css.errorMessage}>Failed to load CV</div>
                    ) : (
                        <img
                            src="Zertifikat_Holler, Irina_FbW WD 24-E04-1_de.jpg"
                            alt="Irina Holler CV"
                            className={css.cvImage}
                            style={{ opacity: imageLoaded ? 1 : 0 }}
                            onLoad={() => setImageLoaded(true)}
                            onError={() => setImageError(true)}
                        />
                    )}
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
};

export default CVViewer;
