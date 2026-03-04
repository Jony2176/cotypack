const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.product.update({
        where: { slug: 'guantes-descartables-polietileno-x100' },
        data: { 
            images: JSON.stringify(['/images/products/guantes-polietileno.png']) 
        }
    });
    console.log('Guantes Descartables corregidos: eliminada captura de pantalla.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
