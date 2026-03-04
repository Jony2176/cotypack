const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // 1. Obtener todas las categorías y subcategorías
    const allCategories = await prisma.category.findMany();
    
    // Mapeo manual de slugs para asegurar precisión total
    const mapping = {
        'bolsa': 'bolsas',
        'bandeja': 'bandejas',
        'plato': 'descartables-reposteria',
        'cuchillo': 'descartables-reposteria',
        'tenedor': 'descartables-reposteria',
        'cuchara': 'descartables-reposteria',
        'peluca': 'decoracion',
        'bengala': 'decoracion',
        'globo': 'decoracion',
        'estallido': 'oficina-comercio',
        'cinta': 'embalaje',
        'broches': 'oficina-comercio',
        'racionador': 'embalaje',
        'etiquetadora': 'embalaje',
        'guante': 'oficina-comercio'
    };

    const products = await prisma.product.findMany();
    console.log(`Analizando ${products.length} productos...`);

    for (const p of products) {
        const name = p.name.toLowerCase();
        let targetSlug = null;

        // Encontrar el slug destino basado en el nombre
        for (const [key, slug] of Object.entries(mapping)) {
            if (name.includes(key)) {
                targetSlug = slug;
                break;
            }
        }

        if (targetSlug) {
            const targetCat = allCategories.find(c => c.slug === targetSlug);
            if (targetCat) {
                await prisma.product.update({
                    where: { id: p.id },
                    data: { categoryId: targetCat.id }
                });
                console.log(`[FIXED] ${p.name.padEnd(40)} -> ${targetCat.name} (id: ${targetCat.id})`);
            }
        }
    }

    // 2. Auditoría final: mostrar cuántos productos hay por subcategoría real
    const finalCheck = await prisma.category.findMany({
        include: { _count: { select: { products: true } } }
    });
    console.table(finalCheck.map(c => ({ 
        name: c.name, 
        count: c._count.products, 
        parentId: c.parentId 
    })));
}

main().catch(console.error).finally(() => prisma.$disconnect());
