import React, { useState } from 'react';
import { motion } from 'framer-motion';
import css from './CVViewer.module.scss';

const CVViewer = ({ onClose }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
        <motion.div
            className={css.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className={css.content}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
            >
                <button className={css.closeButton} onClick={onClose}>
                    ×
                </button>
                <div className={css.imageWrapper}>
                    {imageError ? (
                        <div>Failed to load CV</div>
                    ) : (
                        <img
                            src="CV.png"
                            alt="Irina Holler CV"
                            className={css.cvImage}
                            style={{ opacity: imageLoaded ? 1 : 0 }}
                            onLoad={() => setImageLoaded(true)}
                            onError={() => setImageError(true)}
                        />
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default CVViewer; 