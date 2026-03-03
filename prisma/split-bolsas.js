const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1. Eliminar el producto agrupado
  try {
    await prisma.product.delete({
      where: { slug: 'bolsas-rinon-estampadas-x50' }
    });
    console.log('Producto agrupado eliminado correctamente.');
  } catch (e) {
    console.log('Producto agrupado no encontrado o ya eliminado.');
  }

  // 2. Buscar categoría correspondiente
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

  // 3. Crear productos individuales
  const bolsas = [
    { size: '15x20 cm', price: 2000, slug: 'bolsas-rinon-estampadas-15x20-x50', img: '/images/products/bolsa-riñon-15x20.jpg' },
    { size: '20x30 cm', price: 3000, slug: 'bolsas-rinon-estampadas-20x30-x50', img: '/images/products/bolsa-riñon-20x30.jpg' },
    { size: '25x35 cm', price: 4000, slug: 'bolsas-rinon-estampadas-25x35-x50', img: '/images/products/bolsa-riñon-25x35.jpg' },
    { size: '30x40 cm', price: 4600, slug: 'bolsas-rinon-estampadas-30x40-x50', img: '/images/products/bolsa-riñon-30x40.jpg' },
    { size: '35x45 cm', price: 5500, slug: 'bolsas-rinon-estampadas-35x45-x50', img: '/images/products/bolsa-riñon-35x45.jpg' },
    { size: '40x50 cm', price: 7000, slug: 'bolsas-rinon-estampadas-40x50-x50', img: '/images/products/bolsa-riñon-40x50.jpg' },
    { size: '50x60 cm', price: 9000, slug: 'bolsas-rinon-estampadas-50x60-x50', img: '/images/products/bolsa-riñon-50x60.jpg' }
  ];

  const desc = 'Bolsas de regalo con diseño moderno y llamativo, ideales para realizar la presentación de tus productos. Su práctico formato permite transportarlas cómodamente y aporta un detalle visual atractivo para cualquier ocasión.\n\n• Presentación: Paquete x50 unidades.\n• Diseño: Estampado (modelos sujetos a disponibilidad).\n• Características: Resistentes y fáciles de manipular.';

  for (const b of bolsas) {
    const product = await prisma.product.create({
      data: {
        name: `Bolsas Riñón Estampadas ${b.size} (Pack x50)`,
        slug: b.slug,
        description: desc,
        price: b.price,
        stock: 100, // Stock propio para cada medida
        variants: '[]',
        images: JSON.stringify([b.img]),
        categoryId: category ? category.id : null,
        active: true,
        featured: true // Las marcamos como destacadas para que se vean en el inicio
      }
    });
    console.log(`Creado: ${product.name}`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
