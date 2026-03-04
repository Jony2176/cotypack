import Link from 'next/link';
import styles from './Footer.module.css';

/* SVG Icons */
const IconMP = () => (
  <img src="/images/mercadopago-icon.svg" alt="MercadoPago" width="36" height="24" style={{borderRadius: '4px', filter: 'invert(1) brightness(1.5)'}} />
);

const IconTransfer = () => (
  <svg width="36" height="24" viewBox="0 0 24 16" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 14h20M4 14V4l8-3 8 3v10"/>
    <path d="M12 4v10"/>
  </svg>
);

const IconCash = () => (
  <svg width="36" height="24" viewBox="0 0 24 16" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="10" rx="2"/>
    <circle cx="12" cy="8" r="2"/>
    <path d="M6 8h.01"/>
    <path d="M18 8h.01"/>
  </svg>
);

const IconShield = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const IconLock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const IconTruck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
    <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);

const IconRefresh = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
  </svg>
);

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className={styles.footer}>
            {/* Main Footer Content */}
            <div className={styles.main}>
                <div className={styles.inner}>
                    {/* Brand Column */}
                    <div className={styles.brandCol}>
                        <Link href="/" className={styles.logoLink}>
                            <img src="/images/logo.png" alt="Cotypack" className={styles.logoImg} />
                        </Link>
                        <p className={styles.tagline}>
                            Todo lo que necesitás en cotillón, papelera y repostería.
                        </p>
                        
                        {/* Trust Badges - Horizontal */}
                        <div className={styles.trustRow}>
                            <span className={styles.trustBadge}><IconShield /> Seguro</span>
                            <span className={styles.trustBadge}><IconLock /> SSL</span>
                        </div>

                        {/* Socials */}
                        <div className={styles.socials}>
                            <a href="https://instagram.com" target="_blank" rel="noopener" className={styles.socialBtn} aria-label="Instagram">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                                </svg>
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener" className={styles.socialBtn} aria-label="Facebook">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                                </svg>
                            </a>
                            <a href="https://wa.me/5491159058648" target="_blank" rel="noopener" className={styles.socialBtn} aria-label="WhatsApp">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className={styles.linksCol}>
                        <h4>Productos</h4>
                        <ul>
                            <li><Link href="/productos?categoria=cotillon">Cotillón</Link></li>
                            <li><Link href="/productos?categoria=papelera">Papelera</Link></li>
                            <li><Link href="/productos?categoria=reposteria">Repostería</Link></li>
                            <li><Link href="/mayoristas">Venta Mayorista</Link></li>
                        </ul>
                    </div>

                    <div className={styles.linksCol}>
                        <h4>Empresa</h4>
                        <ul>
                            <li><Link href="/sobre-nosotros">Sobre Nosotros</Link></li>
                            <li><Link href="/pagos">Métodos de Pago</Link></li>
                            <li><Link href="/contacto">Contacto</Link></li>
                            <li><Link href="/privacidad">Política de Privacidad</Link></li>
                        </ul>
                    </div>

                    {/* Contact & Payment Column */}
                    <div className={styles.contactCol}>
                        <h4>Contacto</h4>
                        <ul className={styles.contactList}>
                            <li>Buenos Aires, Argentina</li>
                            <li>hola@cotypack.com</li>
                            <li>+54 11 5905-8648</li>
                        </ul>
                        
                        <h4 className={styles.paymentTitle}>Medios de pago</h4>
                        <div className={styles.paymentIcons}>
                            <IconMP />
                            <IconCash />
                        </div>
                        <p className={styles.paymentNote}>MercadoPago y efectivo</p>
                    </div>
                </div>
            </div>

            {/* Security Bar */}
            <div className={styles.securityBar}>
                <div className={styles.securityInner}>
                    <span><IconTruck /> Retiro en local</span>
                    <span className={styles.divider}>|</span>
                    <span><IconShield /> Compra protegida</span>
                    <span className={styles.divider}>|</span>
                    <span><IconRefresh /> Devoluciones en 10 días</span>
                    <span className={styles.divider}>|</span>
                    <span><IconLock /> Pago seguro SSL</span>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className={styles.bottom}>
                <p>© {year} Cotypack. Todos los derechos reservados. | Hecho con ♥ en Argentina</p>
            </div>
        </footer>
    );
}
