import Link from 'next/link';
import styles from './page.module.css';
import CopyButton from './CopyButton';

function formatPrice(n) {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(n);
}

export default async function CheckoutSuccessPage({ searchParams }) {
    const params = await searchParams;
    const id = params?.id;
    const pago = params?.pago;
    const total = params?.total ? parseFloat(params.total) : null;
    const isMercadoPago = pago === 'mercadopago';

    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.box}>
                    <div className={styles.icon}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <h1 className={styles.title}>¡Pedido recibido!</h1>
                    {id && <p className={styles.orderId}>Número de pedido: <strong>#{id}</strong></p>}

                    {isMercadoPago ? (
                        <>
                            <p className={styles.message}>
                                Para confirmar tu pedido, realizá la transferencia por <strong>{total ? formatPrice(total) : 'el total'}</strong> a los siguientes datos:
                            </p>
                            <div className={styles.paymentCard}>
                                <div className={styles.paymentRow}>
                                    <div className={styles.paymentRowTop}>
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4"/><path d="M20 12h-4a2 2 0 0 0 0 4h4"/></svg>
                                        <span className={styles.paymentLabel}>Titular</span>
                                    </div>
                                    <div className={styles.paymentRowBottom}>
                                        <span className={styles.paymentValue} style={{ fontFamily: 'inherit' }}>Barbara Denisa Ertel</span>
                                    </div>
                                </div>
                                <div className={styles.paymentRow}>
                                    <div className={styles.paymentRowTop}>
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 3v4M8 3v4"/></svg>
                                        <span className={styles.paymentLabel}>Alias</span>
                                    </div>
                                    <div className={styles.paymentRowBottom}>
                                        <span className={styles.paymentValue}>barby.d.e</span>
                                        <CopyButton text="barby.d.e" />
                                    </div>
                                </div>
                                <div className={styles.paymentRow}>
                                    <div className={styles.paymentRowTop}>
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                                        <span className={styles.paymentLabel}>CVU</span>
                                    </div>
                                    <div className={styles.paymentRowBottom}>
                                        <span className={styles.paymentValue}>0000003100010128642581</span>
                                        <CopyButton text="0000003100010128642581" />
                                    </div>
                                </div>
                            </div>
                            <p className={styles.messageSub}>
                                Una vez realizado el pago, coordinamos el retiro por WhatsApp o email.
                            </p>
                        </>
                    ) : (
                        <p className={styles.message}>
                            Gracias por tu compra. Coordinamos el retiro y el pago en efectivo por WhatsApp o email a la brevedad.
                        </p>
                    )}

                    <div className={styles.actions}>
                        <Link href="/productos" className="btn btn-primary">Seguir comprando</Link>
                        <Link href="/contacto" className="btn btn-outline">Contactarnos</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
