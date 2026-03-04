import { createToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const SHARED_PASSWORD = process.env.MAYORISTA_PASSWORD || 'CotyMayorista2026';

export async function POST(request) {
    try {
        const { password } = await request.json();

        if (password !== SHARED_PASSWORD) {
            return NextResponse.json(
                { error: 'Contraseña incorrecta' },
                { status: 401 }
            );
        }

        const token = await createToken({ role: 'mayorista' });
        const cookieStore = await cookies();

        cookieStore.set('mayorista_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error en el servidor' },
            { status: 500 }
        );
    }
}
