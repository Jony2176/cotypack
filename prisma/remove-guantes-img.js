const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.product.update({
        where: { slug: 'guantes-descartables-polietileno-x100' },
        data: { 
            images: JSON.stringify([]) 
        }
    });
    console.log('Imagen de Guantes eliminada por pedido del usuario.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
