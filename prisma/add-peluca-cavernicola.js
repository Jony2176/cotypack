const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const category = await prisma.category.findFirst({ where: { name: { contains: 'Cotill' } } });
  await prisma.product.create({
    data: {
      name: 'Peluca Cavernícola',
      slug: 'peluca-cavernicola',
      description: 'Peluca temática estilo cavernícola con cabello despeinado, ideal para disfraces prehistóricos, fiestas temáticas y eventos divertidos. Un accesorio impactante que completa el look en segundos.',
      price: 15000,
      stock: 100,
      variants: '[]',
      images: '[]',
      categoryId: category ? category.id : null,
      active: true,
      featured: false,
    }
  });
  console.log('Creado: Peluca Cavernícola');
}
main().catch(console.error).finally(async () => { await new PrismaClient().$disconnect(); });
