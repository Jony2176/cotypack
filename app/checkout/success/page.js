import Link from 'next/link';
import styles from './page.module.css';

export default function CheckoutSuccessPage({ searchParams }) {
    const id = searchParams?.id;
    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.box}>
                    <div className={styles.icon}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <h1 className={styles.title}>¡Pedido recibido!</h1>
                    {id && <p className={styles.orderId}>Número de pedido: <strong>#{id}</strong></p>}
                    <p className={styles.message}>
                        Gracias por tu compra. En breve nos pondremos en contacto con vos para coordinar el pago y la entrega.
                    </p>
                    <div className={styles.actions}>
                        <Link href="/productos" className="btn btn-primary">Seguir comprando</Link>
                        <Link href="/contacto" className="btn btn-outline">Contactarnos</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
