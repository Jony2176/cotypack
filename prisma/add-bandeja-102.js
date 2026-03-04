const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const category = await prisma.category.findFirst({ where: { name: { contains: 'Papelera' } } });

  await prisma.product.create({
    data: {
      name: 'Bandeja Descartable Cod.102 (Pack x100)',
      slug: 'bandeja-descartable-cod-102-x100',
      description: 'Ideal para viandas, rotisería y delivery. Resistente y práctica, apta para microondas.\n\n• Medidas: 15x10x05 cm\n• Apta frío/calor\n• Uso gastronómico y comercial\n• Presentación: Pack x100 unidades.',
      price: 4500,
      stock: 100,
      variants: '[]',
      images: JSON.stringify([
        '/images/products/bandeja-102.png',
        '/images/products/propaganda-band-102.jpg'
      ]),
      categoryId: category ? category.id : null,
      active: true,
      featured: false,
    }
  });
  console.log('Creado: Bandeja Descartable Cod.102');
}

main().catch(console.error).finally(async () => { await new PrismaClient().$disconnect(); });
