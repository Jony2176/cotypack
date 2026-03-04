const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const category = await prisma.category.findFirst({ where: { name: { contains: 'Papelera' } } });
  await prisma.product.create({
    data: {
      name: 'Cinta Adhesiva Frágil',
      slug: 'cinta-adhesiva-fragil',
      description: 'Ideal para identificar paquetes delicados y asegurar un traslado más cuidadoso.\n\n• Ancho: 4,8 cm\n• Largo: 50 mts\n• Señalización visible\n• Adhesión firme\n• Alta resistencia\n• Ideal para envíos y mudanzas',
      price: 6500,
      stock: 100,
      variants: '[]',
      images: JSON.stringify(['/images/products/cinta-fragil.png', '/images/products/propaganda-cinta-fragil.jpg']),
      categoryId: category ? category.id : null,
      active: true,
      featured: false,
    }
  });
  console.log('Creado: Cinta Adhesiva Frágil');
}
main().catch(console.error).finally(async () => { await new PrismaClient().$disconnect(); });
