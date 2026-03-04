const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const category = await prisma.category.findFirst({ where: { name: { contains: 'Papelera' } } });
  await prisma.product.create({
    data: {
      name: 'Broches para Abrochadora N°10',
      slug: 'broches-abrochadora-n10',
      description: 'Ideal para uso escolar, oficina y hogar.\n\n• Medida N°10\n• Compatible con abrochadoras estándar N°10\n• Fijación firme\n• Presentación práctica',
      price: 700,
      stock: 100,
      variants: '[]',
      images: JSON.stringify(['/images/products/broches-n10.png']),
      categoryId: category ? category.id : null,
      active: true,
      featured: false,
    }
  });
  console.log('Creado: Broches para Abrochadora N°10');
}
main().catch(console.error).finally(async () => { await new PrismaClient().$disconnect(); });
