'use client';

import { useEffect, useRef } from 'react';
import styles from '@/app/page.module.css';

export default function ProductCarousel({ children }) {
    const scrollRef = useRef(null);
    const autoPlayRef = useRef(null);
    const restartTimeoutRef = useRef(null);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const startAutoPlay = () => {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
            autoPlayRef.current = setInterval(() => {
                if (el.scrollLeft + el.offsetWidth >= el.scrollWidth - 10) {
                    el.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    // Calculamos el ancho de la tarjeta + gap para scrollear exacto 1 item
                    const itemWidth = el.children[0]?.offsetWidth || 160;
                    // Scrolleamos 1 item a la vez
                    el.scrollBy({ left: itemWidth + 16, behavior: 'smooth' });
                }
            }, 3500);
        };

        const stopAutoPlay = () => {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
            if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
            
            // Reiniciar autoplay después de 5 segundos sin interacción
            restartTimeoutRef.current = setTimeout(() => {
                if (window.innerWidth <= 1024) startAutoPlay();
            }, 5000);
        };

        // Iniciar solo en mobile/tablet
        if (window.innerWidth <= 1024) {
            startAutoPlay();
        }

        // Pausar temporalmente al tocar/scrollear manualmente
        el.addEventListener('touchstart', stopAutoPlay, { passive: true });
        el.addEventListener('mousedown', stopAutoPlay, { passive: true });
        el.addEventListener('scroll', stopAutoPlay, { passive: true });

        return () => {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
            if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
            el.removeEventListener('touchstart', stopAutoPlay);
            el.removeEventListener('mousedown', stopAutoPlay);
            el.removeEventListener('scroll', stopAutoPlay);
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
