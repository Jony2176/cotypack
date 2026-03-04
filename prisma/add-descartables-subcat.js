const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // 1. Encontrar la categoría Papelera (padre)
    const papelera = await prisma.category.findUnique({ where: { slug: 'papelera' } });
    if (!papelera) {
        console.error('No se encontró la categoría Papelera');
        return;
    }

    // 2. Crear la subcategoría Descartables dentro de Papelera
    const descartables = await prisma.category.upsert({
        where: { slug: 'descartables-papelera' },
        update: { parentId: papelera.id },
        create: {
            name: 'Descartables',
            slug: 'descartables-papelera',
            parentId: papelera.id,
            displayOrder: 1
        }
    });
    console.log(`Subcategoría "${descartables.name}" creada/actualizada con ID: ${descartables.id}`);

    // 3. Mover productos específicos de Embalaje a Descartables
    // Filtramos productos que están en Embalaje o Papelera y que son claramente descartables
    const productsToMove = await prisma.product.findMany({
        where: {
            OR: [
                { name: { contains: 'Bandeja' } },
                { name: { contains: 'Plato' } },
                { name: { contains: 'Cuchillo' } },
                { name: { contains: 'Tenedor' } },
                { name: { contains: 'Cuchara' } },
                { name: { contains: 'Guante' } },
                { name: { contains: 'Vaso' } }
            ]
        }
    });

    for (const p of productsToMove) {
        await prisma.product.update({
            where: { id: p.id },
            data: { categoryId: descartables.id }
        });
        console.log(`[MOVIDO] ${p.name.padEnd(40)} -> Descartables`);
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
