const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const category = await prisma.category.findFirst({ where: { name: { contains: 'Cotill' } } });
  const catId = category ? category.id : null;

  await prisma.product.create({
    data: {
      name: 'Peluca Bruja',
      slug: 'peluca-bruja',
      description: 'Peluca estilo bruja con cabello largo liso negro con mechones blancos. Ideal para Halloween, fiestas de terror y disfraces temáticos.\n\n• Cabello largo liso\n• Color negro con mechones blancos\n• Cómoda y fácil de colocar\n• Ideal para Halloween y eventos de terror',
      price: 20000,
      stock: 100,
      variants: '[]',
      images: JSON.stringify(['/images/products/peluca-bruja.png']),
      categoryId: catId,
      active: true,
      featured: false,
    }
  });

  await prisma.product.create({
    data: {
      name: 'Peluca Marilyn',
      slug: 'peluca-marilyn',
      description: 'Peluca estilo Marilyn Monroe con cabello corto rubio platinado y ondas marcadas. Ideal para fiestas temáticas retro, disfraces y eventos de los años 50.\n\n• Cabello corto con ondas\n• Color rubio platinado\n• Cómoda y fácil de colocar\n• Ideal para fiestas retro y disfraces',
      price: 13000,
      stock: 100,
      variants: '[]',
      images: '[]',
      categoryId: catId,
      active: true,
      featured: false,
    }
  });

  console.log('Creadas: Peluca Bruja y Peluca Marilyn');
}
main().catch(console.error).finally(async () => { await new PrismaClient().$disconnect(); });
