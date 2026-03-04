const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.update({
    where: { slug: 'cinta-acetato-arcos-globos' },
    data: { images: JSON.stringify(['/images/products/cinta-acetato-v2.jpg', '/images/products/cinta-acetato-v3.jpg']) }
  });
  console.log('Actualizada Cinta Acetato');

  await prisma.product.update({
    where: { slug: 'racionador-cinta-escritorio' },
    data: { images: JSON.stringify(['/images/products/racionador-cinta-v2.jpg']) }
  });
  console.log('Actualizado Racionador');
}

main().catch(console.error).finally(() => prisma.$disconnect());
