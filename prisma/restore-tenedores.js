const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.update({
    where: { slug: 'tenedores-descartables-x50' },
    data: { images: JSON.stringify(['/images/products/tenedores-descartables.png', '/images/products/propaganda-cubiertos.jpg']) }
  });
  console.log('Imagen de Tenedores restaurada a la original sin fondo.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
