import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartProvider from '@/components/CartProvider';

export const metadata = {
  title: {
    default: 'Cotypack by Barby — Cotillón, Papelera y Repostería',
    template: '%s | Cotypack',
  },
  description: 'Tu tienda de cotillón, papelera y repostería. Todo lo que necesitás para tus fiestas y eventos.',
  keywords: ['cotillón', 'papelera', 'papelería', 'bolsas', 'pelucas', 'descartables', 'fiesta', 'decoración', 'cumpleaños', 'argentina', 'repostería'],
  openGraph: {
    title: 'Cotypack by Barby — Cotillón, Papelera y Repostería',
    description: 'Tu tienda de cotillón, papelera y repostería online en Argentina.',
    type: 'website',
    locale: 'es_AR',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <Navbar />
          <main style={{ minHeight: 'calc(100vh - var(--navbar-height))' }}>
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
