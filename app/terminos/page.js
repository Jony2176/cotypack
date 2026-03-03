import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Términos y Condiciones | Cotypack by Barby',
  description: 'Términos y condiciones de uso de la tienda online Cotypack by Barby.',
};

export default function TerminosPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>Términos y Condiciones</h1>
          <p className={styles.subtitle}>Última actualización: Marzo 2026</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.legalContent}>
            <h2>1. Introducción</h2>
            <p>
              Bienvenido a Cotypack by Barby. Al acceder y utilizar este sitio web, 
              aceptás cumplir con estos términos y condiciones de uso. Si no estás de 
              acuerdo con alguna parte de estos términos, por favor no utilices nuestro sitio.
            </p>

            <h2>2. Definiciones</h2>
            <ul>
              <li><strong>"Nosotros"</strong>: Se refiere a Cotypack by Barby, titular del sitio.</li>
              <li><strong>"Vos"</strong>: Se refiere al usuario o cliente que accede al sitio.</li>
              <li><strong>"Productos"</strong>: Bienes ofrecidos a la venta en el sitio.</li>
              <li><strong>"Servicios"</strong>: Funcionalidades y herramientas del sitio.</li>
            </ul>

            <h2>3. Uso del Sitio</h2>
            <p>
              Al utilizar este sitio, garantizás que:
            </p>
            <ul>
              <li>Tenés al menos 18 años de edad o contás con autorización de un mayor.</li>
              <li>La información que proporcionás es verdadera, exacta y completa.</li>
              <li>No usarás el sitio para fines ilegales o no autorizados.</li>
              <li>No intentarás acceder a áreas restringidas del sitio.</li>
            </ul>

            <h2>4. Productos y Precios</h2>
            <p>
              Todos los productos están sujetos a disponibilidad de stock. Nos reservamos 
              el derecho de modificar los precios en cualquier momento sin previo aviso. 
              Los precios publicados incluyen IVA y son en moneda argentina (ARS).
            </p>
            <p>
              Las imágenes de los productos son ilustrativas. El color y diseño pueden 
              variar ligeramente respecto al producto físico.
            </p>

            <h2>5. Compras y Pagos</h2>
            <p>
              Aceptamos los siguientes métodos de pago:
            </p>
            <ul>
              <li>MercadoPago (tarjetas de crédito, débito, dinero en cuenta)</li>
              <li>Transferencia bancaria</li>
              <li>Efectivo (solo para retiro en punto de entrega)</li>
            </ul>
            <p>
              Una vez confirmado el pago, procederemos al despacho del pedido en un 
              plazo de 24 a 72 horas hábiles.
            </p>

            <h2>6. Envíos y Entregas</h2>
            <p>
              Realizamos envíos a todo el territorio argentino a través de:
            </p>
            <ul>
              <li>Correo Argentino</li>
              <li>Logística propia (zona CABA y Gran Buenos Aires)</li>
              <li>Retiro en punto de entrega (consultar disponibilidad)</li>
            </ul>
            <p>
              Los tiempos de entrega son estimativos y pueden variar según la zona 
              y condiciones externas. No nos hacemos responsables por demoras de 
              terceros (correos, transportes).
            </p>

            <h2>7. Cancelaciones y Devoluciones</h2>
            <p>
              Podés cancelar tu pedido antes de que sea despachado. Una vez enviado, 
              las devoluciones se aceptan dentro de los 10 días corridos de recibido 
              el producto, siempre que:
            </p>
            <ul>
              <li>El producto esté sin usar y en su embalaje original.</li>
              <li>Presentes el comprobante de compra.</li>
              <li>El producto no sea de uso personal (artículos de cotillón, descartables).</li>
            </ul>

            <h2>8. Venta Mayorista</h2>
            <p>
              El canal mayorista tiene un monto mínimo de compra de $150.000 ARS. 
              Los precios y condiciones son exclusivos para clientes con cuenta 
              mayorista aprobada. Nos reservamos el derecho de solicitar 
              documentación que acredite la actividad comercial.
            </p>

            <h2>9. Propiedad Intelectual</h2>
            <p>
              Todo el contenido de este sitio (logotipos, textos, imágenes, código) 
              es propiedad de Cotypack by Barby o de sus licenciantes. Queda 
              prohibida su reproducción total o parcial sin autorización expresa.
            </p>

            <h2>10. Limitación de Responsabilidad</h2>
            <p>
              En ningún caso seremos responsables por daños directos, indirectos, 
              incidentales o consecuentes que surjan del uso o la imposibilidad de 
              usar el sitio o los productos adquiridos.
            </p>

            <h2>11. Ley Aplicable</h2>
            <p>
              Estos términos se rigen por las leyes de la República Argentina. 
              Cualquier disputa será sometida a los tribunales competentes de la 
              Ciudad Autónoma de Buenos Aires.
            </p>

            <h2>12. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier 
              momento. Los cambios entrarán en vigor inmediatamente después de su 
              publicación en el sitio. Te recomendamos revisar esta página 
              periódicamente.
            </p>

            <h2>13. Contacto</h2>
            <p>
              Para cualquier consulta sobre estos términos, podés contactarnos en:
            </p>
            <ul>
              <li>Email: hola@cotypack.com</li>
              <li>WhatsApp: +54 11 5005-8648</li>
            </ul>

            <div className={styles.ctaBox}>
              <p>¿Tenés alguna duda sobre nuestros términos?</p>
              <Link href="/contacto" className="btn btn-primary">
                Contactanos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
