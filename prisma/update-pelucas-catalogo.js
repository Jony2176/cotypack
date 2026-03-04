const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1. Peluca Carré: Reemplazar galería con catálogo de colores
  await prisma.product.update({
    where: { slug: 'peluca-lacia-corta-carre' },
    data: { images: JSON.stringify(['/images/products/peluca-carre-colors.jpg']) }
  });
  console.log('Carré: Catálogo de colores cargado.');

  // 2. Peluca Lacia Larga: Reemplazar galería con catálogo de colores
  await prisma.product.update({
    where: { slug: 'peluca-lacia-larga' },
    data: { images: JSON.stringify(['/images/products/peluca-lacia-larga-colors.jpg']) }
  });
  console.log('Lacia Larga: Catálogo de colores cargado.');

  // 3. Peluca Unicornio: Agregar nueva foto real a la galería
  const unicornio = await prisma.product.findUnique({ where: { slug: 'peluca-unicornio' } });
  let unicornioImgs = JSON.parse(unicornio.images || '[]');
  const newUniImg = '/images/products/peluca-unicornio-v3.jpg';
  if (!unicornioImgs.includes(newUniImg)) unicornioImgs.push(newUniImg);
  
  await prisma.product.update({
    where: { slug: 'peluca-unicornio' },
    data: { images: JSON.stringify(unicornioImgs) }
  });
  console.log('Unicornio: Nueva foto agregada.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
