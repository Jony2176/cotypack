const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const category = await prisma.category.findFirst({ where: { name: { contains: 'Papelera' } } });
  await prisma.product.create({
    data: {
      name: 'Bandeja Descartable Cod.103 (Pack x100)',
      slug: 'bandeja-descartable-cod-103-x100',
      description: 'Resistente y práctica, ideal para viandas, rotiserías y delivery. Apta para microondas.\n\n• Medidas: 18x13x05 cm\n• Material: Polipropileno\n• Presentación: Pack x100 unidades.',
      price: 5800,
      stock: 100,
      variants: '[]',
      images: JSON.stringify(['/images/products/bandeja-103.png', '/images/products/propaganda-band-103.jpg']),
      categoryId: category ? category.id : null,
      active: true,
      featured: false,
    }
  });
  console.log('Creado: Bandeja Descartable Cod.103');
}
main().catch(console.error).finally(async () => { await new PrismaClient().$disconnect(); });
