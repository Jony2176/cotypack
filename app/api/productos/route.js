import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET /api/productos?page=1&categoria=slug&buscar=texto&orden=precio_asc&destacados=true
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = parseInt(searchParams.get('limit') || '24');
    const categoria = searchParams.get('categoria');
    const buscar = searchParams.get('buscar');
    const orden = searchParams.get('orden') || 'nombre_asc';
    const destacados = searchParams.get('destacados') === 'true';
    const adminMode = searchParams.get('admin') === 'true';

    const where = {};
    if (!adminMode) where.active = true;
    if (destacados) where.featured = true;
    if (categoria) {
        where.category = { slug: categoria };
    }
    if (buscar) {
        where.OR = [
            { name: { contains: buscar } },
            { description: { contains: buscar } },
        ];
    }

    const orderMap = {
        'nombre_asc': { name: 'asc' },
        'nombre_desc': { name: 'desc' },
        'precio_asc': { price: 'asc' },
        'precio_desc': { price: 'desc' },
        'recientes': { createdAt: 'desc' },
    };
    const orderBy = orderMap[orden] || { name: 'asc' };

    const [products, total] = await Promise.all([
        prisma.product.findMany({
            where,
            orderBy,
            skip: (page - 1) * limit,
            take: limit,
            include: { category: { select: { name: true, slug: true } } },
        }),
        prisma.product.count({ where }),
    ]);

    return NextResponse.json({
        products,
        total,
        page,
        totalPages: Math.ceil(total / limit),
        limit,
    });
}

// POST /api/productos
export async function POST(request) {
    try {
        const body = await request.json();
        const { name, slug, description, price, comparePrice, stock, images, featured, active, categoryId } = body;

        if (!name || !slug || price == null) {
            return NextResponse.json({ error: 'Nombre, slug y precio son requeridos' }, { status: 400 });
        }

        const product = await prisma.product.create({
            data: {
                name,
                slug,
                description: description || null,
                price: parseFloat(price),
                comparePrice: comparePrice ? parseFloat(comparePrice) : null,
                stock: parseInt(stock || 0),
                images: JSON.stringify(images || []),
                featured: featured || false,
                active: active !== false,
                categoryId: categoryId ? parseInt(categoryId) : null,
            },
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        if (error.code === 'P2002') {
            return NextResponse.json({ error: 'El slug ya existe' }, { status: 409 });
        }
        console.error(error);
        return NextResponse.json({ error: 'Error interno' }, { status: 500 });
    }
}
