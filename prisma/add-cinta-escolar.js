const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const category = await prisma.category.findFirst({ where: { name: { contains: 'Papelera' } } });
  await prisma.product.create({
    data: {
      name: 'Cinta Adhesiva Escolar',
      slug: 'cinta-adhesiva-escolar',
      description: 'Ideal para tareas escolares, manualidades y uso diario en el hogar.\n\n• Ancho: 1,2 cm\n• Largo: 25 mts\n• Transparente\n• Fácil de cortar',
      price: 500,
      stock: 100,
      variants: '[]',
      images: JSON.stringify(['/images/products/cinta-escolar.png']),
      categoryId: category ? category.id : null,
      active: true,
      featured: false,
    }
  });
  console.log('Creado: Cinta Adhesiva Escolar');
}
main().catch(console.error).finally(async () => { await new PrismaClient().$disconnect(); });
