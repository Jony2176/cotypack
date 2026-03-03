import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import styles from './layout.module.css';

export const metadata = { title: 'Admin — Cotypack' };

export default async function AdminLayout({ children }) {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    const admin = token ? await verifyToken(token) : null;

    if (!admin) redirect('/login');

    return (
        <div className={styles.layout}>
            <AdminSidebar adminEmail={admin.email} />
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
}
