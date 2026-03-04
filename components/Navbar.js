'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/CartProvider';
import { useState, useEffect, useRef } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
    const { itemCount } = useCart();
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [activeIdx, setActiveIdx] = useState(-1);
    const searchRef = useRef(null);
    const inputRef = useRef(null);
    const debounceRef = useRef(null);
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);

    // Click outside cierra search
    useEffect(() => {
        const handler = (e) => { if (searchRef.current && !searchRef.current.contains(e.target)) { setSearchOpen(false); setSuggestions([]); } };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
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
                        style={{ height: '95px', width: 'auto', display: 'block' }}
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
                    {/* Lupa búsqueda */}
                    <div className={styles.searchWrap} ref={searchRef}>
                        <button
                            className={styles.searchToggle}
                            onClick={() => { setSearchOpen(!searchOpen); setTimeout(() => inputRef.current?.focus(), 100); }}
                            aria-label="Buscar"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        </button>
                        {searchOpen && (
                            <div className={styles.searchDropdown}>
                                <form onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) { router.push(`/productos?buscar=${encodeURIComponent(searchQuery.trim())}`); setSearchOpen(false); setSearchQuery(''); setSuggestions([]); } }}>
                                    <input
                                        ref={inputRef}
                                        className={styles.searchInput}
                                        type="text"
                                        placeholder="¿Qué estás buscando?"
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            clearTimeout(debounceRef.current);
                                            if (e.target.value.length >= 2) {
                                                debounceRef.current = setTimeout(async () => {
                                                    try {
                                                        const res = await fetch(`/api/productos/suggest?q=${encodeURIComponent(e.target.value)}`);
                                                        const data = await res.json();
                                                        setSuggestions(data);
                                                        setActiveIdx(-1);
                                                    } catch { setSuggestions([]); }
                                                }, 200);
                                            } else { setSuggestions([]); }
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Escape') { setSearchOpen(false); setSearchQuery(''); setSuggestions([]); }
                                            if (e.key === 'ArrowDown' && suggestions.length) { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, suggestions.length - 1)); }
                                            if (e.key === 'ArrowUp' && suggestions.length) { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, -1)); }
                                            if (e.key === 'Enter' && activeIdx >= 0) { e.preventDefault(); router.push(`/productos?buscar=${encodeURIComponent(suggestions[activeIdx].name)}`); setSearchOpen(false); setSearchQuery(''); setSuggestions([]); }
                                        }}
                                        autoComplete="off"
                                    />
                                </form>
                                {suggestions.length > 0 && (
                                    <ul className={styles.searchSuggestions}>
                                        {suggestions.map((s, i) => (
                                            <li
                                                key={s.slug}
                                                className={`${styles.searchSugItem} ${i === activeIdx ? styles.searchSugActive : ''}`}
                                                onMouseDown={() => { router.push(`/productos?buscar=${encodeURIComponent(s.name)}`); setSearchOpen(false); setSearchQuery(''); setSuggestions([]); }}
                                            >{s.name}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>

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
