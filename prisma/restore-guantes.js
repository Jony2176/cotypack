const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.update({
    where: { slug: 'guantes-descartables-polietileno-x100' },
    data: { images: JSON.stringify(['/images/products/guantes-polietileno-orig.jpg']) }
  });
  console.log('Restaurado: Guantes de Polietileno');
}

main().catch(console.error).finally(() => prisma.$disconnect());
