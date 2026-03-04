const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.update({
    where: { slug: 'peluca-moicano-punk' },
    data: { images: JSON.stringify(['/images/products/peluca-moicano-punk-v1.jpg']) }
  });
  console.log('Imagen de Peluca Moicano Punk actualizada.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
