const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.product.update({
        where: { slug: 'peluca-charleston' },
        data: { 
            images: JSON.stringify(['/images/products/peluca-charleston-v2.jpg']) 
        }
    });
    console.log('Peluca Charleston corregida: eliminada imagen borrosa.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
