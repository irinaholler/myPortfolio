import React from "react";
import styles from "./AiMasonryGallery.module.scss"; // reuse the SCSS you already have

export default function Modal({ item, onClose }) {
    return (
        <div className={styles.modalBackdrop} onClick={onClose}>
            <article
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
            >
                <button className={styles.close} onClick={onClose}>
                    &times;
                </button>

                <div className={styles.modalBody}>
                    <img src={item.src} alt={item.alt || item.prompt} />

                    <dl className={styles.meta}>
                        <dt>Prompt</dt><dd>{item.prompt}</dd>
                        {item.negativePrompt && (
                            <>
                                <dt>Negative</dt><dd>{item.negativePrompt}</dd>
                            </>
                        )}
                        {item.seed && (
                            <>
                                <dt>Seed</dt><dd>{item.seed}</dd>
                            </>
                        )}
                        {item.model && (
                            <>
                                <dt>Model</dt><dd>{item.model}</dd>
                            </>
                        )}
                        {item.sampler && (
                            <>
                                <dt>Sampler</dt><dd>{item.sampler}</dd>
                            </>
                        )}
                    </dl>
                </div>
            </article>
        </div>
    );
}
