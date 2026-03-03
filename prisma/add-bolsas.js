const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Try to find the category, or use the first one available
  let category = await prisma.category.findFirst({
    where: { name: { contains: 'Bolsas' } }
  });
  
  if (!category) {
    category = await prisma.category.findFirst({
      where: { name: { contains: 'Papelera' } }
    });
  }
  
  if (!category) {
    category = await prisma.category.findFirst();
  }

  const variants = JSON.stringify([
    { name: '15x20 cm', price: 2000, stock: 100 },
    { name: '20x30 cm', price: 3000, stock: 100 },
    { name: '25x35 cm', price: 4000, stock: 100 },
    { name: '30x40 cm', price: 4600, stock: 100 },
    { name: '35x45 cm', price: 5500, stock: 100 },
    { name: '40x50 cm', price: 7000, stock: 100 },
    { name: '50x60 cm', price: 9000, stock: 100 }
  ]);

  const product = await prisma.product.create({
    data: {
      name: 'Bolsas Riñón Estampadas (Pack x50)',
      slug: 'bolsas-rinon-estampadas-x50',
      description: 'Bolsas de regalo con diseño moderno y llamativo, ideales para realizar la presentación de tus productos. Su práctico formato permite transportarlas cómodamente y aporta un detalle visual atractivo para cualquier ocasión.\n\n• Presentación: Paquete x50 unidades.\n• Diseño: Estampado (modelos sujetos a disponibilidad).\n• Características: Resistentes y fáciles de manipular.',
      price: 2000, // base price
      stock: 0, // stock is handled by variants
      variants: variants,
      images: JSON.stringify(['/images/placeholder.jpg']),
      categoryId: category ? category.id : null,
      active: true,
      featured: true
    }
  });

  console.log('Product created:', product.name);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
