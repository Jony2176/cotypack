const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.findUnique({ where: { slug: 'peluca-charleston' } });
  let currentImages = JSON.parse(product.images || '[]');
  
  // Agregar la nueva imagen sin borrar las anteriores
  const newImg = '/images/products/peluca-charleston-v2.jpg';
  if (!currentImages.includes(newImg)) {
    currentImages.push(newImg);
  }

  await prisma.product.update({
    where: { slug: 'peluca-charleston' },
    data: { images: JSON.stringify(currentImages) }
  });
  console.log('Imagen de Peluca Charleston agregada con éxito.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
