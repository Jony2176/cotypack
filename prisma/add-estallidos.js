const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const category = await prisma.category.findFirst({ where: { name: { contains: 'Papelera' } } });

  const variants = JSON.stringify([
    { name: 'N°1 — 4x3 cm', price: 500, stock: 100 },
    { name: 'N°2 — 6x4 cm', price: 600, stock: 100 },
    { name: 'N°3 — 9x6 cm', price: 700, stock: 100 },
    { name: 'N°4 — 10x8 cm', price: 800, stock: 100 },
    { name: 'N°5 — 12x9 cm', price: 1000, stock: 100 },
    { name: 'N°6 — 16x12 cm', price: 1200, stock: 100 },
    { name: 'N°7 — 21x16 cm', price: 1500, stock: 100 },
    { name: 'N°8 — 25x20 cm', price: 1800, stock: 100 },
    { name: 'N°9 — 32x24 cm', price: 2000, stock: 100 },
    { name: 'N°10 — 37x28 cm', price: 2300, stock: 100 },
  ]);

  const images = JSON.stringify([
    '/images/products/propaganda-estallidos.jpg',
    '/images/products/estallidos.jpg',
    '/images/products/propaganda-estallidos-2.jpg'
  ]);

  const product = await prisma.product.create({
    data: {
      name: 'Estallidos',
      slug: 'estallidos',
      description: 'Carteles ideales para precios, ofertas y promociones. Llamativos y de alta visibilidad.\n\n• N°1: 4x3 cm\n• N°2: 6x4 cm\n• N°3: 9x6 cm\n• N°4: 10x8 cm\n• N°5: 12x9 cm\n• N°6: 16x12 cm\n• N°7: 21x16 cm\n• N°8: 25x20 cm\n• N°9: 32x24 cm\n• N°10: 37x28 cm',
      price: 500,
      stock: 0,
      variants,
      images,
      categoryId: category ? category.id : null,
      active: true,
      featured: false,
    }
  });

  console.log('Creado:', product.name);
}

main().catch(console.error).finally(async () => {
  const { PrismaClient: P } = require('@prisma/client');
  await new P().$disconnect();
});
