const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.update({
    where: { slug: 'peluca-monje' },
    data: { images: JSON.stringify(['/images/products/peluca-monje-v2.jpg']) }
  });
  console.log('Imagen de Peluca Monje actualizada.');

  await prisma.product.update({
    where: { slug: 'peluca-cavernicola' },
    data: { images: JSON.stringify(['/images/products/peluca-cavernicola-v3.jpg']) }
  });
  console.log('Imagen de Peluca Cavernícola actualizada.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
