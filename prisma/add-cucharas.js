const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const category = await prisma.category.findFirst({ where: { name: { contains: 'Papelera' } } });

  await prisma.product.create({
    data: {
      name: 'Cucharas Descartables para Postre (Pack x50)',
      slug: 'cucharas-descartables-postre-x50',
      description: 'Ideales para servir helados, postres, y otros alimentos fríos.\n\n• Presentación: Pack x50 unidades.',
      price: 1000,
      stock: 100,
      variants: '[]',
      images: JSON.stringify(['/images/products/cucharas-postre.png', '/images/products/propaganda-cubiertos.jpg']),
      categoryId: category ? category.id : null,
      active: true,
      featured: false,
    }
  });
  console.log('Creado: Cucharas Descartables para Postre');
}

main().catch(console.error).finally(async () => { await new PrismaClient().$disconnect(); });
