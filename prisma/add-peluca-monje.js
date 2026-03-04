const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const category = await prisma.category.findFirst({ where: { name: { contains: 'Cotill' } } });
  await prisma.product.create({
    data: {
      name: 'Peluca Monje',
      slug: 'peluca-monje',
      description: 'Peluca temática estilo monje medieval con clásico diseño de tonsura (centro descubierto y contorno de cabello). Ideal para disfraces religiosos, medievales o fiestas temáticas.',
      price: 18000,
      stock: 100,
      variants: '[]',
      images: JSON.stringify(['/images/products/peluca-monje.png']),
      categoryId: category ? category.id : null,
      active: true,
      featured: false,
    }
  });
  console.log('Creado: Peluca Monje');
}
main().catch(console.error).finally(async () => { await new PrismaClient().$disconnect(); });
