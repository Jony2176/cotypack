const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const category = await prisma.category.findFirst({ where: { name: { contains: 'Cotill' } } });
  const catId = category ? category.id : null;

  // Agregar Peluca Lacia Corta (Carré) con variantes de color
  const colores = ['Azul', 'Rojo', 'Verde', 'Rubio', 'Naranja', 'Negro', 'Blanco', 'Rosa', 'Marrón', 'Violeta'];
  const variants = JSON.stringify(colores.map(c => ({ name: c, price: 5000, stock: 100 })));

  await prisma.product.create({
    data: {
      name: 'Peluca Lacia Corta (Estilo Carré)',
      slug: 'peluca-lacia-corta-carre',
      description: 'Peluca de corte corto estilo carré, con cabello lacio y prolijo que aporta un look moderno y versátil. Ideal para disfraces, cambios de look rápidos, eventos temáticos o producciones.\n\n• Corte carré corto y prolijo\n• Cabello lacio de calidad\n• Disponible en amplia variedad de colores\n• Ideal para eventos, fiestas y producciones fotográficas',
      price: 5000,
      stock: 0,
      variants,
      images: '[]',
      categoryId: catId,
      active: true,
      featured: false,
    }
  });

  console.log('Peluca Lacia Corta creada.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
