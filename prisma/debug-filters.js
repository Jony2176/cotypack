const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('--- CATEGORÍAS PADRE ---');
    const parents = await prisma.category.findMany({ where: { parentId: null } });
    console.table(parents.map(p => ({ id: p.id, name: p.name, slug: p.slug })));

    console.log('\n--- HIJAS / SUBCATEGORÍAS ---');
    const children = await prisma.category.findMany({ where: { parentId: { not: null } } });
    console.table(children.map(c => ({ id: c.id, name: c.name, slug: c.slug, parentId: c.parentId })));

    console.log('\n--- PRODUCTOS Y SU CATEGORÍA ASIGNADA ---');
    const products = await prisma.product.findMany({
        take: 20,
        include: { category: true }
    });
    console.table(products.map(p => ({
        name: p.name.substring(0, 30),
        catId: p.categoryId,
        catName: p.category ? p.category.name : 'NULO',
        catSlug: p.category ? p.category.slug : 'NULO'
    })));
}

main().catch(console.error).finally(() => prisma.$disconnect());
