'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { slugify } from '@/lib/utils';
import styles from './ProductForm.module.css';

export default function ProductForm({ initialData, productId }) {
    const router = useRouter();
    const isEdit = !!productId;

    const [form, setForm] = useState({
        name: '',
        slug: '',
        description: '',
        price: '',
        comparePrice: '',
        stock: '0',
        categoryId: '',
        featured: false,
        active: true,
        ...initialData,
    });

    const [images, setImages] = useState(
        initialData?.images ? JSON.parse(initialData.images) : []
    );

    // Variantes
    const [variants, setVariants] = useState(
        initialData?.variants && initialData.variants !== "[]"
            ? JSON.parse(initialData.variants)
            : []
    );
    const [hasVariants, setHasVariants] = useState(
        initialData?.variants && initialData.variants !== "[]" ? true : false
    );

    const [categories, setCategories] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [autoSlug, setAutoSlug] = useState(!isEdit);

    useEffect(() => {
        fetch('/api/categorias').then(r => r.json()).then(setCategories);
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;
        setForm(f => ({ ...f, [name]: val }));

        if (name === 'name' && autoSlug) {
            setForm(f => ({ ...f, name: val, slug: slugify(val) }));
        }
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;
        setUploading(true);
        setError('');
        try {
            const fd = new FormData();
            files.forEach(f => fd.append('files', f));
            const res = await fetch('/api/upload', { method: 'POST', body: fd });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setImages(prev => [...prev, ...data.urls]);
        } catch (err) {
            setError(`Error al subir imágenes: ${err.message}`);
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (idx) => setImages(imgs => imgs.filter((_, i) => i !== idx));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        const body = {
            ...form,
            price: parseFloat(form.price),
            comparePrice: form.comparePrice ? parseFloat(form.comparePrice) : null,
            stock: parseInt(form.stock),
            categoryId: form.categoryId ? parseInt(form.categoryId) : null,
            images,
            variants: hasVariants ? JSON.stringify(variants) : "[]",
        };

        try {
            const url = isEdit ? `/api/productos/${productId}` : '/api/productos';
            const method = isEdit ? 'PUT' : 'POST';
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (!res.ok) {
                const d = await res.json();
                throw new Error(d.error || 'Error al guardar');
            }
            router.push('/admin/productos');
        } catch (err) {
            setError(err.message);
            setSaving(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.layout}>
                {/* Columna principal */}
                <div className={styles.mainCol}>
                    {/* Info básica */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Información básica</h2>
                        <div className={styles.fields}>
                            <div className="input-group">
                                <label className="input-label">Nombre del producto *</label>
                                <input className="input" name="name" value={form.name} onChange={handleChange} required placeholder="Ej: Globos de Látex Pastel x50" />
                            </div>
                            <div className="input-group">
                                <label className="input-label">
                                    Slug (URL) *
                                    {autoSlug && <span className={styles.autoTag}> • automático</span>}
                                </label>
                                <input
                                    className="input"
                                    name="slug"
                                    value={form.slug}
                                    onChange={e => { setAutoSlug(false); handleChange(e); }}
                                    required
                                    placeholder="globos-latex-pastel-x50"
                                />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Descripción</label>
                                <textarea className="textarea" name="description" value={form.description || ''} onChange={handleChange} rows={4} placeholder="Descripción detallada del producto..." />
                            </div>
                        </div>
                    </div>

                    {/* Imágenes */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Imágenes</h2>
                        <div className={styles.imageGrid}>
                            {images.map((url, i) => (
                                <div key={i} className={styles.imageThumb}>
                                    <img src={url} alt={`Imagen ${i + 1}`} className={styles.thumbImg} />
                                    <button type="button" className={styles.removeImg} onClick={() => removeImage(i)}>✕</button>
                                    {i === 0 && <span className={styles.mainBadge}>Principal</span>}
                                </div>
                            ))}
                            <label className={styles.uploadZone}>
                                {uploading ? (
                                    <div className={styles.uploadLoading}><div className="spinner" style={{ borderColor: 'rgba(108,60,225,0.3)', borderTopColor: 'var(--primary)' }} /></div>
                                ) : (
                                    <>
                                        <span className={styles.uploadIcon}>📷</span>
                                        <span className={styles.uploadText}>Subir imágenes</span>
                                        <span className={styles.uploadHint}>JPG, PNG, WebP — máx 5MB</span>
                                    </>
                                )}
                                <input type="file" accept="image/*" multiple onChange={handleImageUpload} style={{ display: 'none' }} disabled={uploading} />
                            </label>
                        </div>
                    </div>

                    {/* Variantes / Medidas */}
                    <div className={styles.section}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h2 className={styles.sectionTitle} style={{ marginBottom: 0 }}>Variantes (Medidas / Tamaños)</h2>
                            <label className={styles.checkbox}>
                                <input type="checkbox" checked={hasVariants} onChange={(e) => setHasVariants(e.target.checked)} />
                                <span>El producto tiene múltiples medidas</span>
                            </label>
                        </div>

                        {hasVariants && (
                            <div className={styles.variantsContainer}>
                                {variants.map((v, i) => (
                                    <div key={i} className={styles.variantItem}>
                                        <input className="input" placeholder="Nombre (ej: 20x25 cm)" value={v.name} onChange={(e) => {
                                            const newV = [...variants]; newV[i].name = e.target.value; setVariants(newV);
                                        }} required style={{ flex: 2 }} />
                                        <input className="input" type="number" step="0.01" placeholder="Precio" value={v.price} onChange={(e) => {
                                            const newV = [...variants]; newV[i].price = e.target.value; setVariants(newV);
                                        }} required style={{ flex: 1 }} />
                                        <input className="input" type="number" placeholder="Stock" value={v.stock} onChange={(e) => {
                                            const newV = [...variants]; newV[i].stock = e.target.value; setVariants(newV);
                                        }} required style={{ flex: 1 }} />
                                        <button type="button" className={styles.removeVariantBtn} onClick={() => setVariants(variants.filter((_, idx) => idx !== i))}>✕</button>
                                    </div>
                                ))}
                                <button type="button" className="btn btn-ghost" onClick={() => setVariants([...variants, { name: '', price: '', stock: '0' }])} style={{ marginTop: '8px' }}>
                                    + Agregar medida/variante
                                </button>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '12px' }}>
                                    Nota: Cuando habilitás variantes, el precio y stock general (de la derecha) se ignoran en el carrito, usando los de cada variante. Podes dejar el precio general como una referencia.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Columna lateral */}
                <div className={styles.sideCol}>
                    {/* Precios */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Precio</h2>
                        <div className={styles.fields}>
                            <div className="input-group">
                                <label className="input-label">Precio de venta (ARS) *</label>
                                <input className="input" name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} required placeholder="1500" />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Precio anterior (tachado)</label>
                                <input className="input" name="comparePrice" type="number" min="0" step="0.01" value={form.comparePrice || ''} onChange={handleChange} placeholder="2000" />
                            </div>
                        </div>
                    </div>

                    {/* Stock */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Inventario</h2>
                        <div className="input-group">
                            <label className="input-label">Stock disponible</label>
                            <input className="input" name="stock" type="number" min="0" value={form.stock} onChange={handleChange} />
                        </div>
                    </div>

                    {/* Categoría */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Categoría</h2>
                        <select className="select" name="categoryId" value={form.categoryId || ''} onChange={handleChange}>
                            <option value="">Sin categoría</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Visibilidad */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Opciones</h2>
                        <div className={styles.checkboxes}>
                            <label className={styles.checkbox}>
                                <input type="checkbox" name="active" checked={form.active} onChange={handleChange} />
                                <span>Activo (visible en tienda)</span>
                            </label>
                            <label className={styles.checkbox}>
                                <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
                                <span>Destacado (aparece en Home)</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Acciones */}
            <div className={styles.actions}>
                <button type="button" className="btn btn-ghost" onClick={() => router.push('/admin/productos')}>
                    Cancelar
                </button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? <><div className="spinner" /> Guardando...</> : isEdit ? 'Guardar cambios' : 'Crear producto'}
                </button>
            </div>
        </form>
    );
}
