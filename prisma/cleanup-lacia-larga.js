const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const p = await prisma.product.findUnique({ where: { slug: 'peluca-lacia-larga' } });
  if (p) {
    let imgs = JSON.parse(p.images || '[]');
    // Eliminar cualquier imagen que contenga 'v1' o sea un screenshot file_
    const clean = imgs.filter(img => !img.includes('v1.jpg') && !img.includes('inbound') && !img.includes('file_'));
    await prisma.product.update({
      where: { id: p.id },
      data: { images: JSON.stringify(clean) }
    });
    console.log('Lacia Larga: Captura eliminada.');
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
