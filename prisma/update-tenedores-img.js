const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.update({
    where: { slug: 'tenedores-descartables-x50' },
    data: { images: JSON.stringify(['/images/products/tenedores-v2.jpg']) }
  });
  console.log('Imagen de Tenedores reemplazada con éxito.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
