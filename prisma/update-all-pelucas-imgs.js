const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.update({
    where: { slug: 'peluca-unicornio' },
    data: { images: JSON.stringify(['/images/products/peluca-unicornio-v2.jpg']) }
  });
  console.log('Actualizada Unicornio');

  await prisma.product.update({
    where: { slug: 'peluca-lacia-larga' },
    data: { images: JSON.stringify(['/images/products/peluca-lacia-larga-v1.jpg']) }
  });
  console.log('Actualizada Lacia Larga');

  await prisma.product.update({
    where: { slug: 'peluca-lacia-corta-carre' },
    data: { images: JSON.stringify(['/images/products/peluca-carre-v1.jpg']) }
  });
  console.log('Actualizada Carré');

  await prisma.product.update({
    where: { slug: 'peluca-afro' },
    data: { images: JSON.stringify(['/images/products/peluca-afro-v1.jpg']) }
  });
  console.log('Actualizada Afro');
}

main().catch(console.error).finally(() => prisma.$disconnect());
