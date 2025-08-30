import React from "react";
import styles from "../AiMasonryGallery/AiMasonryGallery.module.scss";

export default function AiCard({ item, onClick }) {
    const shortPrompt =
        item.prompt?.length > 60 ? item.prompt.slice(0, 57) + "…" : item.prompt;
    const modelSeed =
        (item.model || "") + (item.model ? " · " : "") + (item.seed || "");

    return (
        <figure className={styles.item} onClick={() => onClick?.(item)}>
            <div className={styles.media}>
                <img src={item.src} alt={item.alt || item.prompt} loading="lazy" />

                {/* Frame icon */}
                <svg className={styles.eye} viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" />
                    <rect x="6" y="6" width="12" height="12" rx="1" ry="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="2" fill="currentColor" />
                </svg>

                {/* hover overlay */}
                <div className={styles.overlay}>
                    <p className={styles.caption}>{shortPrompt}</p>
                    {modelSeed && <span className={styles.metaLine}>{modelSeed}</span>}
                </div>
            </div>
        </figure>
    );
}
