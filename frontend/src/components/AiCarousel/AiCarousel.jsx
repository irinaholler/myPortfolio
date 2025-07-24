import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./AiCarousel.module.scss";

import AiCard from "./AiCard.jsx";
import Modal from "../AiMasonryGallery/Modal.jsx";

export default function AiCarousel({ items = [] }) {
    const [active, setActive] = useState(null);        // modal state

    return (
        <section className={styles.carouselSection}>
            <header className={styles.galleryHeader}>
                <h2>AI-Generated Visuals</h2>
                <p className={styles.sub}>
                    Created with a variety of generative-AI tools.
                </p>
            </header>
            <Swiper
                modules={[Navigation, Mousewheel, Keyboard]}
                slidesPerView="auto"
                centeredSlides
                spaceBetween={24}
                navigation
                mousewheel={{ forceToAxis: true }}
                keyboard
                preloadImages={false}
                lazy={{ loadPrevNext: true }}
                breakpoints={{
                    640: { spaceBetween: 28 },
                    1024: { spaceBetween: 32 }
                }}
                className={styles.deck}
            >
                {items.map(it => (
                    <SwiperSlide key={it.id} className={styles.slide}>
                        <AiCard item={it} onClick={setActive} />   {/* forward click */}
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* full-screen info window */}
            {active && (
                <Modal item={active} onClose={() => setActive(null)} />
            )}
        </section>
    );
}
