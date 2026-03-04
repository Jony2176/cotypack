const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  await prisma.product.update({
    where: { slug: 'bandeja-descartable-cod-107-x100' },
    data: {
      price: 14000,
      description: 'Resistente y práctica, ideal para viandas, catering, rotiserías y delivery. Apta para microondas.\n\n• Medidas: 27x19x05 cm\n• Apta frío y calor\n• Presentación: Pack x100 unidades.',
    }
  });
  console.log('Actualizado: Bandeja Cod.107 → $14.000 / 27x19x05cm');
}
main().catch(console.error).finally(async () => { await new PrismaClient().$disconnect(); });
