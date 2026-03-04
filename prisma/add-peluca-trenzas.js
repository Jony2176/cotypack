const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const category = await prisma.category.findFirst({ where: { name: { contains: 'Cotill' } } });
  await prisma.product.create({
    data: {
      name: 'Peluca con Dos Trenzas y Gorra',
      slug: 'peluca-dos-trenzas-gorra',
      description: 'Peluca divertida con dos largas trenzas combinadas con cintas y gorra incluida. Un accesorio llamativo y original, ideal para fiestas, disfraces y eventos temáticos.',
      price: 20000,
      stock: 100,
      variants: '[]',
      images: '[]',
      categoryId: category ? category.id : null,
      active: true,
      featured: false,
    }
  });
  console.log('Creado: Peluca con Dos Trenzas y Gorra');
}
main().catch(console.error).finally(async () => { await new PrismaClient().$disconnect(); });
