const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const colores = ['Rojo', 'Blanco', 'Negro', 'Verde', 'Violeta', 'Amarillo', 'Azul', 'Rosa', 'Naranja'];
    const variants = JSON.stringify(colores.map(c => ({ name: c, price: 9000, stock: 100 })));

    await prisma.product.update({
        where: { slug: 'peluca-afro' },
        data: { 
            images: JSON.stringify(['/images/products/peluca-afro-final.jpg']),
            variants: variants
        }
    });
    console.log('Peluca Afro actualizada con imagen y variantes de color.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
