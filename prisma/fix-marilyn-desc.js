const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  await prisma.product.update({
    where: { slug: 'peluca-marilyn' },
    data: {
      description: 'Peluca rubia corta con ondas marcadas, inspirada en el icónico estilo hollywoodense. Ideal para recrear un look elegante, sensual y atemporal en fiestas, eventos temáticos o producciones.\n\n• Cabello corto con ondas marcadas\n• Color rubio platinado\n• Inspirada en el estilo de Marilyn Monroe\n• Ideal para fiestas, producciones y eventos temáticos'
    }
  });
  console.log('Descripción actualizada: Peluca Marilyn');
}
main().catch(console.error).finally(async () => { await new PrismaClient().$disconnect(); });
