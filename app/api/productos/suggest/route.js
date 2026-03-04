import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';
    if (q.length < 2) return NextResponse.json([]);

    const results = await prisma.product.findMany({
        where: { active: true, name: { contains: q } },
        select: { name: true, slug: true },
        orderBy: { name: 'asc' },
        take: 8,
    });
    return NextResponse.json(results);
}
