'use client';

import { useState, useEffect } from 'react';
import { slugify } from '@/lib/utils';
import styles from './page.module.css';

export default function AdminCategoriasPage() {
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({ name: '', slug: '', description: '', displayOrder: 0 });
    const [editing, setEditing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const load = async () => {
        const res = await fetch('/api/categorias');
        const data = await res.json();
        setCategories(data);
    };
    useEffect(() => { load(); }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(f => ({
            ...f,
            [name]: value,
            ...(name === 'name' && !editing ? { slug: slugify(value) } : {}),
        }));
    };

    const handleEdit = (cat) => {
        setEditing(cat.id);
        setForm({ name: cat.name, slug: cat.slug, description: cat.description || '', displayOrder: cat.displayOrder || 0 });
    };

    const handleCancel = () => {
        setEditing(null);
        setForm({ name: '', slug: '', description: '', displayOrder: 0 });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); setError('');
        try {
            const url = editing ? `/api/categorias/${editing}` : '/api/categorias';
            const method = editing ? 'PUT' : 'POST';
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, displayOrder: parseInt(form.displayOrder) }),
            });
            if (!res.ok) { const d = await res.json(); throw new Error(d.error); }
            handleCancel();
            load();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, name) => {
        if (!confirm(`¿Eliminar categoría "${name}"? Los productos quedarán sin categoría.`)) return;
        await fetch(`/api/categorias/${id}`, { method: 'DELETE' });
        load();
    };

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Categorías</h1>

            <div className={styles.layout}>
                {/* Formulario */}
                <div className={styles.formSection}>
                    <h2 className={styles.formTitle}>{editing ? 'Editar categoría' : 'Nueva categoría'}</h2>
                    {error && <div className={styles.error}>{error}</div>}
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="input-label">Nombre *</label>
                            <input className="input" name="name" value={form.name} onChange={handleChange} required placeholder="Ej: Globos y Decoración" />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Slug *</label>
                            <input className="input" name="slug" value={form.slug} onChange={handleChange} required placeholder="globos-decoracion" />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Descripción</label>
                            <textarea className="textarea" name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Descripción de la categoría..." />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Orden de visualización</label>
                            <input className="input" name="displayOrder" type="number" value={form.displayOrder} onChange={handleChange} />
                        </div>
                        <div className={styles.formActions}>
                            {editing && <button type="button" className="btn btn-ghost btn-sm" onClick={handleCancel}>Cancelar</button>}
                            <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>
                                {loading ? 'Guardando...' : editing ? 'Guardar' : 'Crear categoría'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Lista */}
                <div className={styles.list}>
                    {categories.map(cat => (
                        <div key={cat.id} className={`${styles.catCard} ${editing === cat.id ? styles.catCardEditing : ''}`}>
                            <div>
                                <div className={styles.catName}>{cat.name}</div>
                                <div className={styles.catSlug}>{cat.slug}</div>
                                {cat._count && <div className={styles.catCount}>{cat._count.products} productos</div>}
                            </div>
                            <div className={styles.catActions}>
                                <button className={styles.editBtn} onClick={() => handleEdit(cat)}>Editar</button>
                                <button className={styles.deleteBtn} onClick={() => handleDelete(cat.id, cat.name)}>Eliminar</button>
                            </div>
                        </div>
                    ))}
                    {categories.length === 0 && <p className={styles.empty}>Sin categorías aún. Creá la primera.</p>}
                </div>
            </div>
        </div>
    );
}
