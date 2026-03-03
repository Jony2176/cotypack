import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Política de Privacidad | Cotypack by Barby',
  description: 'Política de privacidad y protección de datos personales de Cotypack by Barby.',
};

export default function PrivacidadPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>Política de Privacidad</h1>
          <p className={styles.subtitle}>Tu información está segura con nosotros</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.legalContent}>
            <h2>1. Compromiso con la Privacidad</h2>
            <p>
              En Cotypack by Barby nos tomamos muy en serio la protección de tus datos 
              personales. Esta política describe qué información recopilamos, cómo la 
              usamos y qué derechos tenés sobre tus datos.
            </p>

            <h2>2. Información que Recopilamos</h2>
            <h3>2.1 Datos proporcionados por vos</h3>
            <ul>
              <li><strong>Datos de registro:</strong> Nombre, email, teléfono, dirección.</li>
              <li><strong>Datos de compra:</strong> Productos adquiridos, historial de pedidos.</li>
              <li><strong>Datos de pago:</strong> Procesados por MercadoPago, no almacenamos tarjetas.</li>
              <li><strong>Comunicaciones:</strong> Mensajes que nos enviés por formularios o WhatsApp.</li>
            </ul>

            <h3>2.2 Datos recopilados automáticamente</h3>
            <ul>
              <li><strong>Técnicos:</strong> IP, navegador, sistema operativo, dispositivo.</li>
              <li><strong>Uso del sitio:</strong> Páginas visitadas, tiempo de navegación, clicks.</li>
              <li><strong>Cookies:</strong> Ver nuestra <Link href="/cookies">Política de Cookies</Link>.</li>
            </ul>

            <h2>3. Finalidad del Tratamiento</h2>
            <p>Usamos tus datos para:</p>
            <ul>
              <li>Gestionar tu cuenta y procesar tus compras.</li>
              <li>Enviar confirmaciones de pedidos y actualizaciones de envío.</li>
              <li>Responder consultas y brindar soporte al cliente.</li>
              <li>Mejorar nuestros productos y servicios.</li>
              <li>Enviar comunicaciones comerciales (con tu consentimiento).</li>
              <li>Cumplir con obligaciones legales y fiscales.</li>
            </ul>

            <h2>4. Base Legal para el Tratamiento</h2>
            <p>Tratamos tus datos basándonos en:</p>
            <ul>
              <li><strong>Ejecución de contrato:</strong> Para procesar tus compras.</li>
              <li><strong>Consentimiento:</strong> Para enviarte newsletters y promociones.</li>
              <li><strong>Interés legítimo:</strong> Para mejorar nuestros servicios.</li>
              <li><strong>Obligación legal:</strong> Para facturación y requerimientos fiscales.</li>
            </ul>

            <h2>5. Conservación de Datos</h2>
            <p>
              Conservamos tus datos personales durante el tiempo necesario para cumplir 
              con las finalidades descritas:
            </p>
            <ul>
              <li><strong>Datos de cliente:</strong> Mientras mantengas una cuenta activa.</li>
              <li><strong>Datos de compra:</strong> 10 años (obligación fiscal).</li>
              <li><strong>Datos de marketing:</strong> Hasta que solicites la baja.</li>
            </ul>

            <h2>6. Compartir Información</h2>
            <p>No vendemos ni alquilamos tus datos personales. Solo compartimos información con:</p>
            <ul>
              <li><strong>Proveedores de servicios:</strong> MercadoPago (pagos), correos (envíos).</li>
              <li><strong>Autoridades:</strong> Cuando sea requerido por ley.</li>
              <li><strong>Terceros con tu consentimiento:</strong> Cuando nos autorices expresamente.</li>
            </ul>

            <h2>7. Seguridad de la Información</h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas para proteger 
              tus datos contra acceso no autorizado, pérdida o alteración:
            </p>
            <ul>
              <li>Conexión SSL/TLS encriptada (HTTPS).</li>
              <li>Servidores seguros con acceso restringido.</li>
              <li>Contraseñas hasheadas y encriptadas.</li>
              <li>Acceso limitado al personal autorizado.</li>
            </ul>

            <h2>8. Tus Derechos</h2>
            <p>De acuerdo con la Ley de Protección de Datos Personales (Ley 25.326), tenés derecho a:</p>
            <ul>
              <li><strong>Acceso:</strong> Conocer qué datos tenemos sobre vos.</li>
              <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos.</li>
              <li><strong>Supresión:</strong> Solicitar la eliminación de tus datos.</li>
              <li><strong>Oposición:</strong> Oponerte al tratamiento de tus datos.</li>
              <li><strong>Portabilidad:</strong> Solicitar tus datos en formato digital.</li>
            </ul>
            <p>
              Para ejercer estos derechos, escribinos a <strong>hola@cotypack.com</strong> 
              desde el email de tu cuenta.
            </p>

            <h2>9. Cookies y Tecnologías Similares</h2>
            <p>
              Usamos cookies para mejorar tu experiencia. Podés gestionar tus preferencias 
              en nuestra <Link href="/cookies">Política de Cookies</Link> o en la 
              configuración de tu navegador.
            </p>

            <h2>10. Menores de Edad</h2>
            <p>
              Nuestros servicios no están dirigidos a menores de 18 años. Si detectamos 
              que hemos recopilado datos de un menor sin consentimiento parental, 
              los eliminaremos inmediatamente.
            </p>

            <h2>11. Cambios a esta Política</h2>
            <p>
              Podemos actualizar esta política periódicamente. Te notificaremos sobre 
              cambios significativos por email o mediante un aviso en el sitio. La fecha 
              de última actualización se indica al inicio de esta página.
            </p>

            <h2>12. Contacto</h2>
            <p>
              Si tenés preguntas sobre esta política de privacidad, contactanos:
            </p>
            <ul>
              <li>Email: hola@cotypack.com</li>
              <li>WhatsApp: +54 11 5005-8648</li>
              <li>Dirección: Buenos Aires, Argentina</li>
            </ul>

            <div className={styles.ctaBox}>
              <p>¿Querés ejercer algún derecho sobre tus datos?</p>
              <Link href="/contacto" className="btn btn-primary">
                Escribinos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
