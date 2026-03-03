import { createToken, comparePassword } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email y contraseña requeridos' }, { status: 400 });
        }

        const admin = await prisma.admin.findUnique({ where: { email } });
        if (!admin) {
            return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 });
        }

        const valid = await comparePassword(password, admin.password);
        if (!valid) {
            return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 });
        }

        const token = await createToken({ adminId: admin.id, email: admin.email });

        const response = NextResponse.json({ ok: true, email: admin.email });
        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60, // 7 días
            path: '/',
        });

        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error interno' }, { status: 500 });
    }
}
