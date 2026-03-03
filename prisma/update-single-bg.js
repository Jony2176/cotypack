const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.update({
    where: { slug: 'bolsas-rinon-estampadas-30x40-x50' },
    data: {
      images: JSON.stringify(['/images/products/bolsa-riñon-30x40-nobg.png'])
    }
  });

  console.log('Image updated to NO-BG version for 30x40');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
