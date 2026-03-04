const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const subcats = await prisma.category.findMany({
        where: { parentId: { not: null } }
    });

    const products = await prisma.product.findMany();
    
    for (const p of products) {
        let targetSlug = null;
        const name = p.name.toLowerCase();
        
        if (name.includes('bolsa')) targetSlug = 'bolsas';
        else if (name.includes('bandeja')) targetSlug = 'bandejas';
        else if (name.includes('plato') || name.includes('cuchillo') || name.includes('tenedor') || name.includes('cuchara')) targetSlug = 'vajilla-descartable';
        else if (name.includes('peluca') || name.includes('bengala') || name.includes('globo')) targetSlug = 'decoracion';
        else if (name.includes('cinta') || name.includes('broches') || name.includes('racionador')) targetSlug = 'libreria-y-embalaje';
        else if (name.includes('guante')) targetSlug = 'higiene';

        if (targetSlug) {
            const sub = subcats.find(s => s.slug === targetSlug);
            if (sub) {
                await prisma.product.update({
                    where: { id: p.id },
                    data: { categoryId: sub.id }
                });
                console.log(`Producto "${p.name}" asignado a subcategoría: ${sub.name}`);
            }
        }
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
