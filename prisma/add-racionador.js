const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const category = await prisma.category.findFirst({ where: { name: { contains: 'Papelera' } } });
  
  await prisma.product.create({
    data: {
      name: 'Racionador de Cinta de Escritorio',
      slug: 'racionador-cinta-escritorio',
      description: 'Portarrollos racionador de cinta adhesiva, ideal para oficina, hogar o comercio. Base pesada y antideslizante para un corte preciso con una sola mano.\n\n• Compatible con cintas de 12mm y 24mm\n• Cuchilla de acero de alta calidad\n• Base con peso para mayor estabilidad\n• Diseño ergonómico y resistente',
      price: 6000,
      stock: 50,
      variants: '[]',
      images: JSON.stringify(['/images/products/racionador-cinta.jpg', '/images/products/propaganda-racionador.jpg']),
      categoryId: category ? category.id : null,
      active: true,
      featured: false,
    }
  });
  console.log('Creado: Racionador de Cinta');
}

main().catch(console.error).finally(() => prisma.$disconnect());
