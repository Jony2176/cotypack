import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// PUT /api/pedidos/[id] — actualizar estado
export async function PUT(request, { params }) {
    const { id } = await params;
    const { status, notes } = await request.json();
    try {
        const order = await prisma.order.update({
            where: { id: Number(id) },
            data: {
                ...(status && { status }),
                ...(notes !== undefined && { notes }),
            },
        });
        return NextResponse.json(order);
    } catch {
        return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 });
    }
}

// DELETE /api/pedidos/[id]
export async function DELETE(request, { params }) {
    const { id } = await params;
    try {
        await prisma.order.delete({ where: { id: Number(id) } });
        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 });
    }
}
