import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET /api/pedidos
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = 20;

    const where = status ? { status } : {};
    const [orders, total] = await Promise.all([
        prisma.order.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * limit,
            take: limit,
        }),
        prisma.order.count({ where }),
    ]);

    return NextResponse.json({ orders, total, page, totalPages: Math.ceil(total / limit) });
}

// POST /api/pedidos
export async function POST(request) {
    try {
        const body = await request.json();
        const { customerName, customerEmail, customerPhone, items, total, notes } = body;

        if (!customerName || !customerEmail || !items || total == null) {
            return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
        }

        const order = await prisma.order.create({
            data: {
                customerName,
                customerEmail,
                customerPhone: customerPhone || null,
                items: JSON.stringify(items),
                total: parseFloat(total),
                notes: notes || null,
            },
        });

        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error al crear pedido' }, { status: 500 });
    }
}
