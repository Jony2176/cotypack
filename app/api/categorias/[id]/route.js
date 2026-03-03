import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET /api/categorias/[id]
export async function GET(request, { params }) {
    const { id } = await params;
    const cat = await prisma.category.findUnique({ where: { id: Number(id) } });
    if (!cat) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
    return NextResponse.json(cat);
}

// PUT /api/categorias/[id]
export async function PUT(request, { params }) {
    const { id } = await params;
    const body = await request.json();
    try {
        const updated = await prisma.category.update({
            where: { id: Number(id) },
            data: body,
        });
        return NextResponse.json(updated);
    } catch {
        return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 });
    }
}

// DELETE /api/categorias/[id]
export async function DELETE(request, { params }) {
    const { id } = await params;
    try {
        await prisma.category.delete({ where: { id: Number(id) } });
        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 });
    }
}
