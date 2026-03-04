const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // 1. Corregir imágenes de Cinta Acetato (asegurar que tenga las 3)
    await prisma.product.update({
        where: { slug: 'cinta-acetato-arcos-globos' },
        data: {
            images: JSON.stringify([
                '/images/products/cinta-acetato-globos.png',
                '/images/products/propaganda-cinta-acetato-globos.jpg',
                '/images/products/cinta-acetato-v2.jpg',
                '/images/products/cinta-acetato-v3.jpg'
            ])
        }
    });

    // 2. Corregir imágenes de Cinta Adhesiva para Globos (puntos bifaz)
    await prisma.product.update({
        where: { slug: 'cinta-adhesiva-globos' },
        data: {
            images: JSON.stringify([
                '/images/products/cinta-adhesiva-globos-orig.jpg'
            ])
        }
    });

    // 3. Obtener categorías para asignar subcategorías
    const products = await prisma.product.findMany();
    
    for (const p of products) {
        let subcat = null;
        const name = p.name.toLowerCase();
        
        if (name.includes('bolsa')) subcat = 'Bolsas';
        else if (name.includes('bandeja')) subcat = 'Bandejas';
        else if (name.includes('plato') || name.includes('cuchillo') || name.includes('tenedor') || name.includes('cuchara')) subcat = 'Vajilla Descartable';
        else if (name.includes('peluca') || name.includes('bengala') || name.includes('globo')) subcat = 'Decoración';
        else if (name.includes('cinta') || name.includes('broches') || name.includes('racionador')) subcat = 'Librería y Embalaje';
        else if (name.includes('guante')) subcat = 'Higiene';

        if (subcat) {
            await prisma.product.update({
                where: { id: p.id },
                data: { subcategory: subcat }
            });
            console.log(`Asignada subcategoría "${subcat}" a: ${p.name}`);
        }
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
