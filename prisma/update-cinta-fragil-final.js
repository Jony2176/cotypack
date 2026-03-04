const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.update({
    where: { slug: 'cinta-adhesiva-fragil' },
    data: { images: JSON.stringify(['/images/products/cinta-fragil-v3.jpg']) }
  });
  console.log('Imagen de Cinta Frágil reemplazada correctamente.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
