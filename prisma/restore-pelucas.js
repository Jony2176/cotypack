const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const pelucas = [
    { slug: 'peluca-rastafari', img: '/images/products/peluca-rastafari-orig.jpg' },
    { slug: 'peluca-charleston', img: '/images/products/peluca-charleston-orig.jpg' },
    { slug: 'peluca-dos-trenzas-gorra', img: '/images/products/peluca-trenzas-gorra-orig.jpg' },
    { slug: 'peluca-cavernicola', img: '/images/products/peluca-cavernicola-orig.jpg' },
    { slug: 'peluca-bruja', img: '/images/products/peluca-bruja-orig.jpg' },
    { slug: 'peluca-marilyn', img: '/images/products/peluca-marilyn-orig.jpg' },
    { slug: 'peluca-monje', img: '/images/products/peluca-monje-orig.jpg' }
  ];

  for (const p of pelucas) {
    await prisma.product.update({
      where: { slug: p.slug },
      data: { images: JSON.stringify([p.img]) }
    });
    console.log('Restaurada original:', p.slug);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
