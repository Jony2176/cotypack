const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  await prisma.product.update({
    where: { slug: 'bandeja-descartable-cod-105-rec-x100' },
    data: { price: 9000 }
  });
  console.log('Actualizado: Bandeja 105 Rectangular → $9.000');
}
main().catch(console.error).finally(async () => { await new PrismaClient().$disconnect(); });
