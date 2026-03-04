const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // 1. Limpiar Peluca Charleston (quitar el screenshot negro con texto)
    await prisma.product.update({
        where: { slug: 'peluca-charleston' },
        data: { images: JSON.stringify(['/images/products/peluca-charleston.png', '/images/products/peluca-charleston-v2.jpg']) }
    });
    console.log('Charleston: Screenshot eliminado.');

    // 2. Actualizar Peluca Moicano Punk con la nueva foto y quitar cualquier referencia anterior
    await prisma.product.update({
        where: { slug: 'peluca-moicano-punk' },
        data: { images: JSON.stringify(['/images/products/peluca-moicano-punk-v2.jpg']) }
    });
    console.log('Moicano Punk: Foto actualizada.');

    // 3. Revisión rápida de otros productos para asegurar que no hay screenshots file_ en la galería
    const products = await prisma.product.findMany();
    for (const p of products) {
        let imgs = JSON.parse(p.images || '[]');
        const clean = imgs.filter(img => !img.includes('inbound') && !img.includes('v1.jpg')); // v1 solía ser mi primer intento de carga con screenshot
        if (clean.length !== imgs.length) {
            await prisma.product.update({
                where: { id: p.id },
                data: { images: JSON.stringify(clean) }
            });
            console.log(`Limpieza general en: ${p.name}`);
        }
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
