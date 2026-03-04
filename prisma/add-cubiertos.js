const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const category = await prisma.category.findFirst({ where: { name: { contains: 'Papelera' } } });
  const catId = category ? category.id : null;

  const productos = [
    {
      name: 'Cuchillos Descartables (Pack x50)',
      slug: 'cuchillos-descartables-x50',
      description: 'Diseñados para cortar alimentos blandos y acompañar comidas en fiestas, eventos o negocios gastronómicos.\n\n• Presentación: Pack x50 unidades.',
      price: 1600,
      images: ['/images/products/cuchillos-descartables.png', '/images/products/propaganda-cubiertos.jpg'],
    },
    {
      name: 'Tenedores Descartables (Pack x50)',
      slug: 'tenedores-descartables-x50',
      description: 'Ideales para comidas frías, ensaladas y postres.\n\n• Presentación: Pack x50 unidades.',
      price: 1600,
      images: ['/images/products/tenedores-descartables.png', '/images/products/propaganda-cubiertos.jpg'],
    },
  ];

  for (const p of productos) {
    await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        stock: 100,
        variants: '[]',
        images: JSON.stringify(p.images),
        categoryId: catId,
        active: true,
        featured: false,
      }
    });
    console.log('Creado:', p.name);
  }
}

main().catch(console.error).finally(async () => { await new PrismaClient().$disconnect(); });
