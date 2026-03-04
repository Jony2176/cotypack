const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const category = await prisma.category.findFirst({ where: { name: { contains: 'Papelera' } } });
  await prisma.product.create({
    data: {
      name: 'Bandeja Descartable Cod.107 (Pack x100)',
      slug: 'bandeja-descartable-cod-107-x100',
      description: 'Resistente y práctica, ideal para viandas, rotiserías, catering y delivery. Apta para microondas.\n\n• Medidas: 22x17x05 cm\n• Apta frío y calor\n• Presentación: Pack x100 unidades.',
      price: 9000,
      stock: 100,
      variants: '[]',
      images: JSON.stringify(['/images/products/bandeja-107.png', '/images/products/propaganda-band-107.jpg']),
      categoryId: category ? category.id : null,
      active: true,
      featured: false,
    }
  });
  console.log('Creado: Bandeja Descartable Cod.107');
}
main().catch(console.error).finally(async () => { await new PrismaClient().$disconnect(); });
