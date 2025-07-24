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

                {/* eye icon */}
                <svg className={styles.eye} viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                    <circle cx="12" cy="12" r="3" />
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
