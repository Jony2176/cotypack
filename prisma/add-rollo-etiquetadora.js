const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const category = await prisma.category.findFirst({ where: { name: { contains: 'Papelera' } } });
  
  const colores = ['Verde Flúo', 'Naranja Flúo', 'Fucsia Flúo', 'Blanco', 'Amarillo Flúo'];
  const variants = JSON.stringify(colores.map(c => ({ name: c, price: 800, stock: 100 })));

  await prisma.product.create({
    data: {
      name: 'Rollos para Etiquetadora Manual',
      slug: 'rollos-etiquetadora-manual',
      description: 'Rollos de etiquetas autoadhesivas compatibles con la mayoría de las etiquetadoras manuales de una línea. Ideales para marcar precios, fechas o códigos.\n\n• Colores flúo de alta visibilidad\n• Excelente adhesión\n• Fácil de cargar en la máquina\n• Presentación: Rollo individual',
      price: 800,
      stock: 0,
      variants,
      images: JSON.stringify(['/images/products/rollo-etiquetadora.jpg']),
      categoryId: category ? category.id : null,
      active: true,
      featured: false,
    }
  });
  console.log('Creado: Rollos para Etiquetadora');
}

main().catch(console.error).finally(() => prisma.$disconnect());
