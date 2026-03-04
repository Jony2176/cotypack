const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.product.update({
        where: { slug: 'peluca-monje' },
        data: { 
            images: JSON.stringify(['/images/products/peluca-monje-v2.jpg']) 
        }
    });
    console.log('Peluca Monje corregida: eliminada captura de pantalla.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
