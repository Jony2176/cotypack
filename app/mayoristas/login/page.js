'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function MayoristaLoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/mayoristas/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (res.ok) {
                router.push('/productos');
                router.refresh();
            } else {
                setError(data.error || 'Algo salió mal');
            }
        } catch (err) {
            setError('Error de conexión');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Acceso Mayorista</h1>
                <p className={styles.subtitle}>
                    Ingresá la contraseña compartida para ver el catálogo con precios especiales.
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.group}>
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña compartida"
                            required
                            className={styles.input}
                        />
                    </div>

                    {error && <div className={styles.error}>{error}</div>}

                    <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                        {loading ? 'Ingresando...' : 'Ver Precios Mayoristas'}
                    </button>
                </form>

                <p className={styles.footer}>
                    Si aún no sos cliente mayorista, solicitalo <a href="/mayoristas">aquí</a>.
                </p>
            </div>
        </div>
    );
}
