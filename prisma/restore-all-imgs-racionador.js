const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.update({
    where: { slug: 'racionador-cinta-escritorio' },
    data: { 
      images: JSON.stringify([
        '/images/products/racionador-cinta.jpg', 
        '/images/products/propaganda-racionador.jpg',
        '/images/products/racionador-cinta-v2.jpg'
      ]) 
    }
  });
  console.log('Racionador actualizado: ahora tiene las 3 imágenes.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
