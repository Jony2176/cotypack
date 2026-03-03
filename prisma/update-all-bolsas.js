const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const updates = [
    { slug: 'bolsas-rinon-estampadas-15x20-x50', img: '/images/products/bolsa-riñon-15x20-nobg.png' },
    { slug: 'bolsas-rinon-estampadas-20x30-x50', img: '/images/products/bolsa-riñon-20x30-nobg.png' },
    { slug: 'bolsas-rinon-estampadas-25x35-x50', img: '/images/products/bolsa-riñon-25x35-nobg.png' },
    { slug: 'bolsas-rinon-estampadas-35x45-x50', img: '/images/products/bolsa-riñon-35x45-nobg.png' },
    { slug: 'bolsas-rinon-estampadas-40x50-x50', img: '/images/products/bolsa-riñon-40x50-nobg.png' },
    { slug: 'bolsas-rinon-estampadas-50x60-x50', img: '/images/products/bolsa-riñon-50x60-nobg.png' }
  ];

  for (const u of updates) {
    try {
      await prisma.product.update({
        where: { slug: u.slug },
        data: { images: JSON.stringify([u.img]) }
      });
      console.log(`Updated ${u.slug}`);
    } catch (e) {
      console.log(`Skipped ${u.slug}`);
    }
  }
}

main().finally(async () => {
  await prisma.$disconnect();
});
