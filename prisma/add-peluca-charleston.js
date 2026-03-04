const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const category = await prisma.category.findFirst({ where: { name: { contains: 'Cotill' } } });
  await prisma.product.create({
    data: {
      name: 'Peluca Charleston',
      slug: 'peluca-charleston',
      description: 'Peluca estilo años 20 con corte bob rubio claro, ideal para recrear el clásico look flapper. Incluye vincha con lentejuelas rojas y pluma decorativa que aporta un toque sofisticado y llamativo.\n\n• Corte bob corto con ondas marcadas\n• Color rubio claro\n• Incluye vincha elástica con lentejuelas y pluma roja\n• Ideal para fiestas temáticas, carnaval y eventos estilo Gatsby\n\nPerfecta para completar disfraces de charleston, cabaret o fiestas retro. Un accesorio elegante que transforma tu look en segundos.',
      price: 15000,
      stock: 100,
      variants: '[]',
      images: JSON.stringify(['/images/products/peluca-charleston.png']),
      categoryId: category ? category.id : null,
      active: true,
      featured: false,
    }
  });
  console.log('Creado: Peluca Charleston');
}
main().catch(console.error).finally(async () => { await new PrismaClient().$disconnect(); });
