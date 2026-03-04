const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const category = await prisma.category.findFirst({ where: { name: { contains: 'Cotill' } } });
  await prisma.product.create({
    data: {
      name: 'Peluca Rastafari',
      slug: 'peluca-rastafari',
      description: 'Peluca temática estilo rastafari con largas rastas color marrón, ideal para fiestas, disfraces, eventos temáticos y cotillón. Un accesorio llamativo que transforma cualquier look en segundos y suma diversión asegurada.\n\n• Modelo con rastas largas\n• Color marrón natural\n• Cómoda y fácil de colocar\n• Ideal para fiestas, carnaval y eventos temáticos',
      price: 20000,
      stock: 100,
      variants: '[]',
      images: JSON.stringify(['/images/products/peluca-rastafari.png']),
      categoryId: category ? category.id : null,
      active: true,
      featured: false,
    }
  });
  console.log('Creado: Peluca Rastafari');
}
main().catch(console.error).finally(async () => { await new PrismaClient().$disconnect(); });
