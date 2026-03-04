const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // 1. Obtener todas las subcategorías con sus padres
    const allCats = await prisma.category.findMany();
    const subcats = allCats.filter(c => c.parentId !== null);
    
    const findSub = (slug) => subcats.find(s => s.slug === slug);

    const products = await prisma.product.findMany({
        include: { category: true }
    });

    console.log(`Procesando ${products.length} productos...`);

    for (const p of products) {
        const name = p.name.toLowerCase();
        let targetId = p.categoryId;

        // Lógica de reasignación por palabras clave
        if (name.includes('bolsa')) {
            targetId = findSub('bolsas')?.id;
        } else if (name.includes('bandeja')) {
            targetId = findSub('bandejas')?.id;
        } else if (name.includes('plato') || name.includes('cuchillo') || name.includes('tenedor') || name.includes('cuchara') || name.includes('vajilla') || name.includes('vaso') || name.includes('mantel')) {
            targetId = findSub('descartables-reposteria')?.id;
        } else if (name.includes('peluca') || name.includes('bengala') || name.includes('globo') || name.includes('banner') || name.includes('centrotabla') || name.includes('confetti') || name.includes('serpentina')) {
            targetId = findSub('decoracion')?.id;
        } else if (name.includes('cinta') || name.includes('broches') || name.includes('racionador') || name.includes('rollo') || name.includes('etiquetadora')) {
            targetId = findSub('embalaje')?.id;
        } else if (name.includes('guante')) {
            targetId = findSub('higiene')?.id || findSub('oficina-comercio')?.id;
        }

        // Si encontramos una subcategoría mejor o si estaba en una categoría padre (2, 5, 6)
        const isParent = [2, 5, 6].includes(p.categoryId);
        if (targetId && (targetId !== p.categoryId || isParent)) {
            await prisma.product.update({
                where: { id: p.id },
                data: { categoryId: targetId }
            });
            const newCat = allCats.find(c => c.id === targetId);
            console.log(`[OK] ${p.name.padEnd(40)} -> ${newCat.name}`);
        }
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
