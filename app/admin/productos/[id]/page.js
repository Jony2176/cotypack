import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';
import styles from '../nuevo/page.module.css';

export default async function EditarProductoPage({ params }) {
    const { id } = await params;
    const product = await prisma.product.findUnique({ where: { id: Number(id) } });
    if (!product) notFound();

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Editar Producto</h1>
            <ProductForm initialData={product} productId={product.id} />
        </div>
    );
}
