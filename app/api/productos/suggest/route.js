import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

function normalize(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';
    if (q.length < 2) return NextResponse.json([]);

    // Fetch all active products and filter in JS (accent-insensitive)
    const all = await prisma.product.findMany({
        where: { active: true },
        select: { name: true, slug: true },
        orderBy: { name: 'asc' },
    });

    const norm = normalize(q);
    const results = all.filter(p => normalize(p.name).includes(norm)).slice(0, 8);
    return NextResponse.json(results);
}
