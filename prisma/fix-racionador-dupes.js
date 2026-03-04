const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.update({
    where: { slug: 'racionador-cinta-escritorio' },
    data: { 
      images: JSON.stringify([
        '/images/products/racionador-cinta.jpg', 
        '/images/products/racionador-cinta-v2.jpg'
      ]) 
    }
  });
  console.log('Racionador actualizado: eliminada imagen duplicada.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
