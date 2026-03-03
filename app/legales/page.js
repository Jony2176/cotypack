import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Aviso Legal | Cotypack by Barby',
  description: 'Información legal, datos del titular y responsabilidades de Cotypack by Barby.',
};

export default function LegalesPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>Aviso Legal</h1>
          <p className={styles.subtitle}>Información corporativa y responsabilidades</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.legalContent}>
            <h2>1. Datos del Titular</h2>
            <div className={styles.infoBox}>
              <p><strong>Razón Social:</strong> [Nombre completo del emprendimiento]</p>
              <p><strong>Nombre Comercial:</strong> Cotypack by Barby</p>
              <p><strong>CUIT/CUIL:</strong> [Número de CUIT]</p>
              <p><strong>Domicilio Comercial:</strong> [Dirección completa]</p>
              <p><strong>Teléfono:</strong> +54 11 5005-8648</p>
              <p><strong>Email:</strong> hola@cotypack.com</p>
            </div>

            <h2>2. Datos del Sitio Web</h2>
            <p>
              <strong>URL:</strong> https://cotypack.com<br/>
              <strong>Titular del dominio:</strong> [Nombre del titular]<br/>
              <strong>Fecha de inicio:</strong> 2014
            </p>

            <h2>3. Actividad</h2>
            <p>
              Cotypack by Barby se dedica a la comercialización de productos de cotillón, 
              papelería, repostería y artículos descartables para eventos. Operamos 
              principalmente en la República Argentina, con envíos a todo el territorio nacional.
            </p>

            <h2>4. Responsabilidad sobre el Contenido</h2>
            <p>
              La información contenida en este sitio web es proporcionada con fines informativos 
              y comerciales. Nos esforzamos por mantener la información actualizada y precisa, 
              pero no garantizamos que todo el contenido esté libre de errores u omisiones.
            </p>
            <p>
              Los precios, disponibilidad de productos y condiciones comerciales están sujetos 
              a cambio sin previo aviso. Las imágenes de los productos son ilustrativas y pueden 
              no reflejar exactamente el producto físico.
            </p>

            <h2>5. Propiedad Intelectual</h2>
            <p>
              Todo el contenido de este sitio, incluyendo pero no limitado a textos, imágenes, 
              logotipos, gráficos, videos, código fuente y diseño, es propiedad de Cotypack by 
              Barby o se utiliza con licencia de terceros.
            </p>
            <p>
              Queda prohibida la reproducción, distribución, comunicación pública, transformación 
              o cualquier otro uso del contenido sin autorización expresa y por escrito del titular.
            </p>
            <p>
              El nombre "Cotypack by Barby", su logotipo y otros signos distintivos son marcas 
              registradas o en proceso de registro. Su uso no autorizado está prohibido.
            </p>

            <h2>6. Enlaces a Terceros</h2>
            <p>
              Este sitio puede contener enlaces a sitios web de terceros (MercadoPago, redes 
              sociales, etc.). No nos hacemos responsables del contenido, políticas de privacidad 
              o prácticas de dichos sitios externos.
            </p>

            <h2>7. Ley Aplicable y Jurisdicción</h2>
            <p>
              El presente aviso legal se rige por las leyes de la República Argentina. 
              Cualquier controversia que surja del uso de este sitio web será sometida a los 
              tribunales ordinarios de la Ciudad Autónoma de Buenos Aires, con renuncia a 
              cualquier otro fuero que pudiera corresponder.
            </p>

            <h2>8. Protección de Datos</h2>
            <p>
              De acuerdo con la Ley 25.326 de Protección de Datos Personales, te informamos 
              que tus datos personales serán tratados conforme a nuestra 
              <Link href="/privacidad"> Política de Privacidad</Link>. 
              Podés ejercer los derechos de acceso, rectificación y supresión contactándonos 
              a hola@cotypack.com.
            </p>

            <h2>9. Autoridad de Control</h2>
            <p>
              La Agencia de Acceso a la Información Pública, en su carácter de Órgano de Control 
              de la Ley N° 25.326, tiene la atribución de atender las denuncias y reclamos que 
              interpongan quienes resulten afectados en sus derechos por incumplimiento de las 
              normas vigentes en materia de protección de datos personales.
            </p>
            <p>
              <strong>Dirección:</strong> Av. Pte. Julio A. Roca 710, Piso 5º, Ciudad Autónoma de Buenos Aires<br/>
              <strong>Teléfono:</strong> 011-2821-0047<br/>
              <strong>Email:</strong> datospersonales@aaip.gob.ar
            </p>

            <h2>10. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de modificar este aviso legal en cualquier momento. 
              Los cambios entrarán en vigor desde su publicación en esta página. Te recomendamos 
              revisar periódicamente esta sección.
            </p>

            <h2>11. Contacto Legal</h2>
            <p>
              Para cualquier consulta legal o para ejercer tus derechos, contactanos:
            </p>
            <ul>
              <li>Email: hola@cotypack.com</li>
              <li>Asunto: "Consulta Legal"</li>
            </ul>

            <p className={styles.lastUpdated}>
              <strong>Última actualización:</strong> Marzo 2026
            </p>

            <div className={styles.ctaBox}>
              <p>¿Tenés alguna pregunta sobre nuestros términos legales?</p>
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
