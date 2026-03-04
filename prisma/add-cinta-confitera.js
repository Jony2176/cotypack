const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const category = await prisma.category.findFirst({ where: { name: { contains: 'Papelera' } } });
  await prisma.product.create({
    data: {
      name: 'Cinta Adhesiva Confitera',
      slug: 'cinta-adhesiva-confitera',
      description: 'Perfecta para embalaje liviano, envoltorios y uso general en comercios.\n\n• Ancho: 2,4 cm\n• Largo: 40 mts\n• Adhesión firme\n• Fácil de cortar',
      price: 500,
      stock: 100,
      variants: '[]',
      images: JSON.stringify(['/images/products/cinta-confitera.png']),
      categoryId: category ? category.id : null,
      active: true,
      featured: false,
    }
  });
  console.log('Creado: Cinta Adhesiva Confitera');
}
main().catch(console.error).finally(async () => { await new PrismaClient().$disconnect(); });
