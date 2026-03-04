const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.update({
    where: { slug: 'tenedores-descartables-x50' },
    data: { 
      images: JSON.stringify(['/images/products/tenedores-final.jpg']) 
    }
  });
  console.log('Imagen de Tenedores actualizada por la versión final de catálogo.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
