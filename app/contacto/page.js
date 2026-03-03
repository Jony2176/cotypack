// Server Component — puede exportar metadata
import styles from './page.module.css';
import ContactoForm from './ContactoForm';

export const metadata = {
    title: 'Contacto',
    description: 'Contactate con Cotypack para consultas, pedidos especiales o información sobre nuestros productos.',
};

export default function ContactoPage() {
    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.header}>
                    <h1 className={styles.title}>Contactanos</h1>
                    <p className={styles.sub}>¿Tenés alguna consulta? Escribinos y te respondemos a la brevedad.</p>
                </div>
                <ContactoForm />
            </div>
        </div>
    );
}
