const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.findUnique({ where: { slug: 'cinta-adhesiva-globos' } });
  let currentImages = JSON.parse(product.images || '[]');
  
  const newImg = '/images/products/cinta-adhesiva-globos-v2.jpg';
  if (!currentImages.includes(newImg)) {
    currentImages.push(newImg);
  }

  await prisma.product.update({
    where: { slug: 'cinta-adhesiva-globos' },
    data: { images: JSON.stringify(currentImages) }
  });
  console.log('Imagen de Cinta Adhesiva para Globos agregada.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
