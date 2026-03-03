import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET /api/categorias
export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { displayOrder: 'asc' },
            include: { _count: { select: { products: { where: { active: true } } } } },
        });
        return NextResponse.json(categories);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error interno' }, { status: 500 });
    }
}

// POST /api/categorias
export async function POST(request) {
    try {
        const body = await request.json();
        const { name, slug, description, imageUrl, displayOrder } = body;
        if (!name || !slug) {
            return NextResponse.json({ error: 'Nombre y slug son requeridos' }, { status: 400 });
        }
        const cat = await prisma.category.create({
            data: { name, slug, description, imageUrl, displayOrder: displayOrder || 0 },
        });
        return NextResponse.json(cat, { status: 201 });
    } catch (error) {
        if (error.code === 'P2002') {
            return NextResponse.json({ error: 'El slug ya existe' }, { status: 409 });
        }
        return NextResponse.json({ error: 'Error interno' }, { status: 500 });
    }
}
