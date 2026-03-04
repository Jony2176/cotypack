const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  await prisma.product.update({
    where: { slug: 'peluca-marilyn' },
    data: { images: JSON.stringify(['/images/products/peluca-marilyn.png']) }
  });
  console.log('OK');
}
main().catch(console.error).finally(async () => { await new PrismaClient().$disconnect(); });
