const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.update({
    where: { slug: 'cinta-adhesiva-globos' },
    data: { images: JSON.stringify(['/images/products/cinta-adhesiva-globos-orig.jpg']) }
  });
  console.log('Restaurada: Cinta Adhesiva para Globos');

  await prisma.product.update({
    where: { slug: 'cinta-acetato-arcos-globos' },
    data: { images: JSON.stringify(['/images/products/cinta-acetato-globos-orig.jpg']) }
  });
  console.log('Restaurada: Cinta de Acetato para Arcos de Globos');
}

main().catch(console.error).finally(() => prisma.$disconnect());
