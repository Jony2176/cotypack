import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET /api/productos/[id]
export async function GET(request, { params }) {
    const { id } = await params;

    // Buscar por id numérico o slug
    const isNumeric = !isNaN(id);
    const product = await prisma.product.findFirst({
        where: isNumeric ? { id: Number(id) } : { slug: id },
        include: { category: true },
    });

    if (!product) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
    return NextResponse.json(product);
}

// PUT /api/productos/[id]
export async function PUT(request, { params }) {
    const { id } = await params;
    try {
        const body = await request.json();
        const { name, slug, description, price, comparePrice, stock, images, featured, active, categoryId } = body;

        const updated = await prisma.product.update({
            where: { id: Number(id) },
            data: {
                ...(name && { name }),
                ...(slug && { slug }),
                ...(description !== undefined && { description }),
                ...(price != null && { price: parseFloat(price) }),
                ...(comparePrice !== undefined && { comparePrice: comparePrice ? parseFloat(comparePrice) : null }),
                ...(stock != null && { stock: parseInt(stock) }),
                ...(images !== undefined && { images: JSON.stringify(images) }),
                ...(featured !== undefined && { featured }),
                ...(active !== undefined && { active }),
                ...(categoryId !== undefined && { categoryId: categoryId ? parseInt(categoryId) : null }),
            },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 });
    }
}

// DELETE /api/productos/[id]
export async function DELETE(request, { params }) {
    const { id } = await params;
    try {
        await prisma.product.delete({ where: { id: Number(id) } });
        return NextResponse.json({ ok: true });
    } catch (error) {
        return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 });
    }
}
