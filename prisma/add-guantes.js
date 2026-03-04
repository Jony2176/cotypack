const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const category = await prisma.category.findFirst({ where: { name: { contains: 'Papelera' } } });
  await prisma.product.create({
    data: {
      name: 'Guantes Descartables de Polietileno (Pack x100)',
      slug: 'guantes-descartables-polietileno-x100',
      description: 'Ideales para mantener la higiene en todo momento.\n\n• Material liviano y resistente\n• Uso descartable\n• Talle único\n• Prácticos y fáciles de colocar\n• Presentación: Pack x100 unidades',
      price: 600,
      stock: 100,
      variants: '[]',
      images: JSON.stringify(['/images/products/guantes-polietileno.png']),
      categoryId: category ? category.id : null,
      active: true,
      featured: false,
    }
  });
  console.log('Creado: Guantes Descartables de Polietileno');
}
main().catch(console.error).finally(async () => { await new PrismaClient().$disconnect(); });
