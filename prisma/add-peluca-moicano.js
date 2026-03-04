const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const category = await prisma.category.findFirst({ where: { name: { contains: 'Cotill' } } });
  
  await prisma.product.create({
    data: {
      name: 'Peluca Moicano Punk',
      slug: 'peluca-moicano-punk',
      description: 'Peluca estilo mohawk con cresta llamativa y efecto luminoso, ideal para looks rebeldes y fiestas nocturnas. Perfecta para destacar en eventos, boliches, carnaval y fiestas temáticas.\n\n• Diseño moicano con cresta alta\n• Efecto luminoso / luces integradas\n• Colores vibrantes (según disponibilidad)\n• Liviana y cómoda de usar\n\nIdeal para fiestas nocturnas, eventos flúo, shows y cumpleaños. Un accesorio impactante que no pasa desapercibido.',
      price: 30000,
      stock: 100,
      variants: '[]',
      images: '[]',
      categoryId: category ? category.id : null,
      active: true,
      featured: false,
    }
  });
  console.log('Creado: Peluca Moicano Punk');
}

main().catch(console.error).finally(() => prisma.$disconnect());
