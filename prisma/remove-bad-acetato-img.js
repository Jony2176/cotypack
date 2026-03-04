const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.product.update({
        where: { slug: 'cinta-acetato-arcos-globos' },
        data: {
            images: JSON.stringify([
                '/images/products/cinta-acetato-globos-orig.jpg',
                '/images/products/propaganda-cinta-acetato-globos.jpg',
                '/images/products/cinta-acetato-v2.jpg',
                '/images/products/cinta-acetato-v3.jpg'
            ])
        }
    });
    console.log('Imagen fallida eliminada de Cinta Acetato.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
