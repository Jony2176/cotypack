const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const category = await prisma.category.findFirst({ where: { name: { contains: 'Cotill' } } });
  const colores = [
    'Negro','Rojo','Azul','Verde oscuro','Verde pastel','Verde manzana','Verde agua',
    'Celeste','Celeste pastel','Amarillo','Dorado','Plateado','Rosa','Rosa pastel',
    'Rosa gold','Fucsia','Blanco','Naranja','Lila','Violeta','Azul y dorado',
    'Blanco y rojo','Turquesa','Multicolor'
  ];
  const variants = JSON.stringify(colores.map(c => ({ name: c, price: 1000, stock: 100 })));
  await prisma.product.create({
    data: {
      name: 'Bengalas para Tortas',
      slug: 'bengalas-para-tortas',
      description: 'Dale un toque mágico a tus celebraciones con nuestras bengalas para tortas. Ideales para cumpleaños, aniversarios y eventos especiales.\n\n• 24 colores disponibles\n• Efecto brillante y colorido\n• ⚠️ Producto inflamable — utilizar bajo supervisión adulta',
      price: 1000,
      stock: 0,
      variants,
      images: JSON.stringify(['/images/products/bengalas-tortas.png']),
      categoryId: category ? category.id : null,
      active: true,
      featured: true,
    }
  });
  console.log('Creado: Bengalas para Tortas');
}
main().catch(console.error).finally(async () => { await new PrismaClient().$disconnect(); });
