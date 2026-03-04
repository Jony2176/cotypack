const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const category = await prisma.category.findFirst({ where: { name: { contains: 'Cotill' } } });
  const catId = category ? category.id : null;

  await prisma.product.create({
    data: {
      name: 'Peluca Unicornio',
      slug: 'peluca-unicornio',
      description: 'Peluca fantasía inspirada en el mágico mundo unicornio. Lista para usar, sin necesidad de accesorios extra.\n\n• Cabello largo en tonos fantasía vibrantes\n• Incluye cuerno y orejas integrados\n• Diseño llamativo y divertido\n• Cómoda y fácil de colocar',
      price: 35000,
      stock: 100,
      variants: '[]',
      images: '[]',
      categoryId: catId,
      active: true,
      featured: true,
    }
  });

  await prisma.product.create({
    data: {
      name: 'Peluca Afro',
      slug: 'peluca-afro',
      description: 'Peluca estilo afro con gran volumen y forma redonda característica, ideal para fiestas retro, disfraces, eventos temáticos y shows. Un accesorio divertido y llamativo que completa cualquier look en segundos.',
      price: 9000,
      stock: 100,
      variants: '[]',
      images: '[]',
      categoryId: catId,
      active: true,
      featured: false,
    }
  });

  console.log('Creadas: Peluca Unicornio y Peluca Afro');
}

main().catch(console.error).finally(() => prisma.$disconnect());
