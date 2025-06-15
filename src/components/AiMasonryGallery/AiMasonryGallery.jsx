import React, { useState, useRef, useEffect } from 'react';
import styles from './AiMasonryGallery.module.scss';
import { motion } from 'framer-motion';

const AiMasonryGallery = () => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const galleryRef = useRef(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('/aiImages.js');
                const data = await response.json();
                setImages(data);
                setIsLoading(false);
            } catch (err) {
                setError('Failed to load images');
                setIsLoading(false);
            }
        };

        fetchImages();
    }, []);

    const handleMouseMove = (e) => {
        const item = e.currentTarget;
        const rect = item.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        item.style.setProperty('--mouse-x', x);
        item.style.setProperty('--mouse-y', y);
    };

    const handleMouseLeave = (e) => {
        const item = e.currentTarget;
        item.style.setProperty('--mouse-x', 0);
        item.style.setProperty('--mouse-y', 0);
    };

    if (isLoading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <div className={styles.galleryContainer}>
            <div className={styles.gallery} ref={galleryRef}>
                {images.map((image, index) => (
                    <motion.div
                        key={image.id}
                        className={styles.item}
                        style={{ '--item-index': index }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <img
                            src={image.url}
                            alt={image.title}
                            className={styles.image}
                            loading="lazy"
                        />
                        <div className={styles.caption}>
                            <h3>{image.title}</h3>
                            <p>{image.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AiMasonryGallery; 