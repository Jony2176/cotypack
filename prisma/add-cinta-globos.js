const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const category = await prisma.category.findFirst({ where: { name: { contains: 'Cotill' } } });
  await prisma.product.create({
    data: {
      name: 'Cinta Adhesiva para Globos',
      slug: 'cinta-adhesiva-globos',
      description: 'Decora sin enredos ni cintas visibles. Nuestros puntos adhesivos bifaz son perfectos para pegar globos y crear fondos increíbles.\n\n• Prácticos\n• Rápidos\n• Invisibles\n• Presentación: x100 unidades',
      price: 1000,
      stock: 100,
      variants: '[]',
      images: JSON.stringify(['/images/products/cinta-adhesiva-globos.png']),
      categoryId: category ? category.id : null,
      active: true,
      featured: false,
    }
  });
  console.log('Creado: Cinta Adhesiva para Globos');
}
main().catch(console.error).finally(async () => { await new PrismaClient().$disconnect(); });
