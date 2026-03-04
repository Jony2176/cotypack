const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const cats = await prisma.category.findMany({ include: { _count: { select: { products: true } } } });
    console.log('--- CONTEO POR CATEGORÍA ---');
    console.table(cats.map(c => ({ id: c.id, name: c.name, slug: c.slug, parent: c.parentId, count: c._count.products })));
    
    const total = await prisma.product.count({ where: { active: true } });
    console.log('Total productos activos:', total);
    
    const unassigned = await prisma.product.count({ where: { categoryId: null } });
    console.log('Productos sin categoría:', unassigned);
}

main().catch(console.error).finally(() => prisma.$disconnect());
