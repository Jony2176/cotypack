const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const category = await prisma.category.findFirst({ where: { name: { contains: 'Cotill' } } });
  await prisma.product.create({
    data: {
      name: 'Cinta de Acetato para Arcos de Globos',
      slug: 'cinta-acetato-arcos-globos',
      description: 'La herramienta ideal para crear decoraciones impactantes sin complicaciones.\n\n• Permite insertar los nudos de los globos en los orificios\n• Flexible y liviana\n• Apta para globos de diferentes medidas\n• Fácil de cortar y adaptar al espacio\n• Reutilizable\n• Medida: 5 mts',
      price: 1000,
      stock: 100,
      variants: '[]',
      images: JSON.stringify([
        '/images/products/cinta-acetato-globos.png',
        '/images/products/propaganda-cinta-acetato-globos.jpg'
      ]),
      categoryId: category ? category.id : null,
      active: true,
      featured: false,
    }
  });
  console.log('Creado: Cinta de Acetato para Arcos de Globos');
}
main().catch(console.error).finally(async () => { await new PrismaClient().$disconnect(); });
