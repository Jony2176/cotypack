'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Error al iniciar sesión');
            }
            router.push('/admin');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo.png" alt="Cotypack by Barby" style={{ height: '64px', width: 'auto', objectFit: 'contain', margin: '0 auto', display: 'block' }} />
                <h1 className={styles.title}>Panel Admin</h1>
                <p className={styles.sub}>Cotypack by Barby — Gestión de tienda</p>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label" htmlFor="email">Email</label>
                        <input id="email" className="input" type="email" name="email" value={form.email} onChange={handleChange} required autoComplete="email" placeholder="admin@cotypack.com" />
                    </div>
                    <div className="input-group">
                        <label className="input-label" htmlFor="password">Contraseña</label>
                        <input id="password" className="input" type="password" name="password" value={form.password} onChange={handleChange} required autoComplete="current-password" placeholder="••••••••" />
                    </div>
                    {error && <div className={styles.error}>{error}</div>}
                    <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%' }}>
                        {loading ? <><div className="spinner" /> Ingresando...</> : 'Ingresar'}
                    </button>
                </form>
            </div>
        </div>
    );
}
