'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SearchAutocomplete.module.css';

export default function SearchAutocomplete({ defaultValue = '', categoria = '', sub = '', orden = '' }) {
    const [query, setQuery] = useState(defaultValue);
    const [suggestions, setSuggestions] = useState([]);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(-1);
    const debounceRef = useRef(null);
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);
    const router = useRouter();

    const fetchSuggestions = useCallback((q) => {
        if (q.length < 2) { setSuggestions([]); setOpen(false); return; }
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(async () => {
            try {
                const res = await fetch(`/api/productos/suggest?q=${encodeURIComponent(q)}`);
                const data = await res.json();
                setSuggestions(data);
                setOpen(data.length > 0);
                setActive(-1);
            } catch { setSuggestions([]); }
        }, 200);
    }, []);

    const buildUrl = (buscar) => {
        const p = new URLSearchParams();
        p.set('page', '1');
        // Si hay búsqueda, limpiar filtros de categoría para buscar en todo
        if (!buscar) {
            if (categoria) p.set('categoria', categoria);
            if (sub) p.set('sub', sub);
        }
        if (orden && orden !== 'nombre_asc') p.set('orden', orden);
        if (buscar) p.set('buscar', buscar);
        return `/productos?${p.toString()}`;
    };

    const handleSelect = (name) => {
        setQuery(name);
        setOpen(false);
        router.push(buildUrl(name));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setOpen(false);
        router.push(buildUrl(query));
    };

    const handleKeyDown = (e) => {
        if (!open) return;
        if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, suggestions.length - 1)); }
        if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, -1)); }
        if (e.key === 'Enter' && active >= 0) { e.preventDefault(); handleSelect(suggestions[active].name); }
        if (e.key === 'Escape') { setOpen(false); setActive(-1); }
    };

    // Click outside
    useEffect(() => {
        const handler = (e) => { if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={wrapperRef} className={styles.wrapper}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputWrap}>
                    <svg className={styles.icon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input
                        ref={inputRef}
                        className={styles.input}
                        type="text"
                        value={query}
                        placeholder="Buscar productos..."
                        onChange={(e) => { setQuery(e.target.value); fetchSuggestions(e.target.value); }}
                        onKeyDown={handleKeyDown}
                        onFocus={() => { if (suggestions.length > 0) setOpen(true); }}
                        autoComplete="off"
                    />
                    {query && (
                        <button type="button" className={styles.clear} onClick={() => { setQuery(''); setSuggestions([]); setOpen(false); inputRef.current?.focus(); }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                    )}
                </div>
                <button type="submit" className={styles.btn}>Buscar</button>
            </form>

            {open && suggestions.length > 0 && (
                <ul className={styles.dropdown}>
                    {suggestions.map((s, i) => (
                        <li
                            key={s.slug}
                            className={`${styles.item} ${i === active ? styles.itemActive : ''}`}
                            onMouseDown={() => handleSelect(s.name)}
                        >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                            {s.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
