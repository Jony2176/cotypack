import ProductForm from '@/components/admin/ProductForm';
import styles from './page.module.css';

export const metadata = { title: 'Nuevo Producto — Admin' };

export default function NuevoProductoPage() {
    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Nuevo Producto</h1>
            <ProductForm />
        </div>
    );
}
