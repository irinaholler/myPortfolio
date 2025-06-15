// AiMasonryGallery.jsx — side‑by‑side modal (image left, details right) + refined hover overlay
// -----------------------------------------------------------------------------
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./AiMasonryGallery.module.scss";

function AiMasonryGallery({ items = [] }) {
    const [active, setActive] = useState(null);
    const imgRefs = useRef([]);

    /* Masonry row‑span helper */
    const fixImageSpan = (img) => {
        const rowHeight = 10; // match $row-height in SCSS
        const rowGap = 16;    // match $gap
        const h = img.getBoundingClientRect().height;
        const span = Math.ceil((h + rowGap) / (rowHeight + rowGap));
        img.closest("figure").style.gridRowEnd = `span ${span}`;
    };

    useEffect(() => {
        const onResize = () => imgRefs.current.forEach((i) => i && fixImageSpan(i));
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <>
            <section className={styles.gallery}>
                {items.map((item, idx) => {
                    const shortPrompt = item.prompt?.length > 60 ? `${item.prompt.slice(0, 57)}…` : item.prompt;
                    const modelSeed = `${item.model || ""}${item.model ? " · " : ""}${item.seed || ""}`;

                    return (
                        <figure
                            key={item.id}
                            className={`${styles.item} ${idx % 5 === 0 ? styles.tall : ""}`}
                            onClick={() => setActive(item)}
                        >
                            {/* wrapper so hover overlay aligns to photo */}
                            <div className={styles.media}>
                                <img
                                    src={item.src}
                                    alt={item.alt || item.prompt}
                                    loading="lazy"
                                    ref={(el) => {
                                        if (el) {
                                            imgRefs.current.push(el);
                                            el.complete ? fixImageSpan(el) : (el.onload = () => fixImageSpan(el));
                                        }
                                    }}
                                />

                                {/* Eye icon */}
                                <svg className={styles.eye} viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>

                                {/* Hover overlay */}
                                <div className={styles.overlay}>
                                    <p className={styles.caption}>{shortPrompt}</p>
                                    {modelSeed && <span className={styles.metaLine}>{modelSeed}</span>}
                                </div>
                            </div>
                        </figure>
                    );
                })}
            </section>

            {active &&
                ReactDOM.createPortal(
                    <div className={styles.modalBackdrop} onClick={() => setActive(null)}>
                        <article className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                            <button className={styles.close} aria-label="Close" onClick={() => setActive(null)}>&times;</button>

                            {/* side‑by‑side layout */}
                            <div className={styles.modalBody}>
                                <img src={active.src} alt={active.alt || active.prompt} />

                                <dl className={styles.meta}>
                                    <dt>Prompt</dt><dd>{active.prompt}</dd>
                                    {active.negativePrompt && (<><dt>Negative</dt><dd>{active.negativePrompt}</dd></>)}
                                    {active.seed && (<><dt>Seed</dt><dd>{active.seed}</dd></>)}
                                    {active.model && (<><dt>Model</dt><dd>{active.model}</dd></>)}
                                    {active.sampler && (<><dt>Sampler</dt><dd>{active.sampler}</dd></>)}
                                </dl>
                            </div>
                        </article>
                    </div>,
                    document.body
                )}
        </>
    );
}

export default AiMasonryGallery;
