const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const category = await prisma.category.findFirst({ where: { name: { contains: 'Cotill' } } });
  const catId = category ? category.id : null;

  // Actualizar Unicornio con la imagen recibida
  await prisma.product.update({
    where: { slug: 'peluca-unicornio' },
    data: { images: JSON.stringify(['/images/products/peluca-unicornio-v1.jpg']) }
  });

  // Agregar Peluca Lacia Larga con variantes de color
  const colores = ['Marrón', 'Negro', 'Blanco', 'Rosa', 'Azul', 'Rojo', 'Verde', 'Naranja', 'Rubio'];
  const variants = JSON.stringify(colores.map(c => ({ name: c, price: 8000, stock: 100 })));

  await prisma.product.create({
    data: {
      name: 'Peluca Lacia Larga',
      slug: 'peluca-lacia-larga',
      description: 'Peluca de cabello lacio y largo, disponible en una amplia gama de colores. Ideal para caracterizaciones, disfraces y eventos sociales.\n\n• Largo y lacio\n• Colores vibrantes y naturales\n• Talle único adaptable\n• Material sintético de calidad',
      price: 8000,
      stock: 0,
      variants,
      images: '[]',
      categoryId: catId,
      active: true,
      featured: false,
    }
  });

  console.log('Unicornio actualizada y Lacia Larga creada.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
