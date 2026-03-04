const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const category = await prisma.category.findFirst({ where: { name: { contains: 'Papelera' } } });
  await prisma.product.create({
    data: {
      name: 'Platos Descartables p/Postres (Pack x50)',
      slug: 'platos-descartables-postres-x50',
      description: 'Ideales para servir tortas y postres en cumpleaños y eventos.\n\n• Diámetro: 17 cm\n• Pack x50 unidades\n• Livianos y prácticos\n• Uso descartable',
      price: 2600,
      stock: 100,
      variants: '[]',
      images: JSON.stringify(['/images/products/plato-postre.png', '/images/products/propaganda-plato-postre.jpg']),
      categoryId: category ? category.id : null,
      active: true,
      featured: false,
    }
  });
  console.log('Creado: Platos Descartables p/Postres');
}
main().catch(console.error).finally(async () => { await new PrismaClient().$disconnect(); });
