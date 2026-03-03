const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const images = [
    '/images/products/propaganda-b-rinon-2.jpg',
    '/images/products/bolsa-riñon-15x20.jpg',
    '/images/products/bolsa-riñon-20x30.jpg',
    '/images/products/bolsa-riñon-25x35.jpg',
    '/images/products/bolsa-riñon-30x40.jpg',
    '/images/products/bolsa-riñon-35x45.jpg',
    '/images/products/bolsa-riñon-40x50.jpg',
    '/images/products/bolsa-riñon-50x60.jpg'
  ];

  await prisma.product.update({
    where: { slug: 'bolsas-rinon-estampadas-x50' },
    data: {
      images: JSON.stringify(images)
    }
  });

  console.log('Images updated for Bolsas Riñón');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
