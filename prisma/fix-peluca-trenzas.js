const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  await prisma.product.update({
    where: { slug: 'peluca-dos-trenzas-gorra' },
    data: { images: JSON.stringify(['/images/products/peluca-trenzas-gorra.png']) }
  });
  console.log('Imagen actualizada: Peluca con Dos Trenzas y Gorra');
}
main().catch(console.error).finally(async () => { await new PrismaClient().$disconnect(); });
