'use client';

import { useEffect, useRef } from 'react';
import styles from '@/app/page.module.css';

export default function ProductCarousel({ children }) {
    const scrollRef = useRef(null);
    const autoPlayRef = useRef(null);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const startAutoPlay = () => {
            autoPlayRef.current = setInterval(() => {
                if (el.scrollLeft + el.offsetWidth >= el.scrollWidth - 10) {
                    el.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    el.scrollBy({ left: 200, behavior: 'smooth' });
                }
            }, 4000);
        };

        const stopAutoPlay = () => {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        };

        // Solo auto-play en mobile/tablet
        if (window.innerWidth <= 1024) {
            startAutoPlay();
        }

        el.addEventListener('touchstart', stopAutoPlay);
        el.addEventListener('mousedown', stopAutoPlay);

        return () => {
            stopAutoPlay();
            el.removeEventListener('touchstart', stopAutoPlay);
            el.removeEventListener('mousedown', stopAutoPlay);
        };
    }, []);

    return (
        <div className={styles.carouselContainer}>
            <div className={styles.productsCarousel} ref={scrollRef}>
                {children}
            </div>
        </div>
    );
}
