'use client';
import ReCAPTCHA from 'react-google-recaptcha';
import { useState } from 'react';
import styles from './RecaptchaField.module.css';

export default function RecaptchaField({ onVerify }) {
  const [error, setError] = useState('');
  
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
  
  const handleChange = (token) => {
    if (token) {
      setError('');
      onVerify(token);
    } else {
      setError('Por favor, completá el captcha.');
      onVerify(null);
    }
  };

  const handleExpired = () => {
    setError('El captcha expiró. Por favor, completalo nuevamente.');
    onVerify(null);
  };

  return (
    <div className={styles.container}>
      <ReCAPTCHA
        sitekey={siteKey}
        onChange={handleChange}
        onExpired={handleExpired}
        theme="light"
        size="normal"
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
