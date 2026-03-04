const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const category = await prisma.category.findFirst({ where: { name: { contains: 'Papelera' } } });
  await prisma.product.create({
    data: {
      name: 'Platos Descartables para Comidas (Pack x50)',
      slug: 'platos-descartables-comidas-x50',
      description: 'Ideales para servir snacks, sándwich o comidas en cumpleaños y eventos.\n\n• Diámetro: 22 cm\n• Pack x50 unidades\n• Prácticos y resistentes\n• Uso descartable',
      price: 5000,
      stock: 100,
      variants: '[]',
      images: JSON.stringify(['/images/products/plato-grande.png', '/images/products/propaganda-plato-grande.jpg']),
      categoryId: category ? category.id : null,
      active: true,
      featured: false,
    }
  });
  console.log('Creado: Platos Descartables para Comidas');
}
main().catch(console.error).finally(async () => { await new PrismaClient().$disconnect(); });
