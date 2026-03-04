const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.update({
    where: { slug: 'peluca-rastafari' },
    data: { images: JSON.stringify(['/images/products/peluca-rastafari-v2.jpg']) }
  });
  console.log('Imagen de Peluca Rastafari actualizada.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
