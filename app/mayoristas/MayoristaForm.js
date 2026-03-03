'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function MayoristaForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    negocio: '',
    tipoNegocio: '',
    mensaje: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.successMessage}>
        <div className={styles.successIcon}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        </div>
        <h3>¡Solicitud enviada!</h3>
        <p>Nos pondremos en contacto con vos a la brevedad.</p>
        <Link href="/" className="btn btn-primary" style={{marginTop: '20px'}}>
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="nombre">Nombre completo *</label>
          <input
            type="text"
            id="nombre"
            required
            value={formData.nombre}
            onChange={(e) => setFormData({...formData, nombre: e.target.value})}
            placeholder="Tu nombre"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="telefono">Teléfono *</label>
          <input
            type="tel"
            id="telefono"
            required
            value={formData.telefono}
            onChange={(e) => setFormData({...formData, telefono: e.target.value})}
            placeholder="11 1234 5678"
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          placeholder="tu@email.com"
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="negocio">Nombre del negocio *</label>
          <input
            type="text"
            id="negocio"
            required
            value={formData.negocio}
            onChange={(e) => setFormData({...formData, negocio: e.target.value})}
            placeholder="Nombre de tu comercio"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="tipoNegocio">Tipo de negocio *</label>
          <select
            id="tipoNegocio"
            required
            value={formData.tipoNegocio}
            onChange={(e) => setFormData({...formData, tipoNegocio: e.target.value})}
          >
            <option value="">Seleccionar...</option>
            <option value="cotillon">Cotillón / Librería</option>
            <option value="kiosco">Kiosco / Almacén</option>
            <option value="panaderia">Panadería / Confitería</option>
            <option value="reposteria">Repostería</option>
            <option value="online">Tienda Online</option>
            <option value="otro">Otro</option>
          </select>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="mensaje">¿Qué productos te interesan? (opcional)</label>
        <textarea
          id="mensaje"
          rows={3}
          value={formData.mensaje}
          onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
          placeholder="Contanos qué tipo de productos buscás..."
        />
      </div>

      <button type="submit" className={`btn btn-secondary btn-lg ${styles.submitBtn}`}>
        Enviar solicitud
      </button>
    </form>
  );
}
