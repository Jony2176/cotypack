'use client';

import Link from 'next/link';
import { useCart } from '@/components/CartProvider';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
    const { itemCount } = useCart();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.inner}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/images/logo.png"
                        alt="Cotypack by Barby"
                        style={{ height: '78px', width: 'auto', display: 'block' }}
                    />
                </Link>

                {/* Links escritorio */}
                <div className={styles.links}>
                    <Link href="/" className={styles.link}>Inicio</Link>
                    <Link href="/productos" className={styles.link}>Productos</Link>
                    <Link href="/sobre-nosotros" className={styles.link}>Nosotros</Link>
                    <Link href="/contacto" className={styles.link}>Contacto</Link>
                    <Link href="/mayoristas" className={`${styles.link} ${styles.linkMayorista}`}>Mayoristas</Link>
                </div>

                {/* Acciones */}
                <div className={styles.actions}>
                    <Link href="/carrito" className={styles.cartBtn} aria-label="Carrito">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        {itemCount > 0 && (
                            <span className={styles.cartBadge}>{itemCount > 99 ? '99+' : itemCount}</span>
                        )}
                    </Link>

                    {/* Menú hamburguesa móvil */}
                    <button
                        className={styles.menuBtn}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Menú"
                    >
                        <span className={`${styles.bar} ${menuOpen ? styles.barTop : ''}`}></span>
                        <span className={`${styles.bar} ${menuOpen ? styles.barMid : ''}`}></span>
                        <span className={`${styles.bar} ${menuOpen ? styles.barBot : ''}`}></span>
                    </button>
                </div>
            </div>

            {/* Menú móvil */}
            <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
                <Link href="/" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Inicio</Link>
                <Link href="/productos" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Productos</Link>
                <Link href="/sobre-nosotros" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Sobre Nosotros</Link>
                <Link href="/contacto" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Contacto</Link>
                <Link href="/mayoristas" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Venta Mayorista</Link>
            </div>
        </nav>
    );
}
