const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Unificando Descartables en Papelera para coincidir con el logo...');

  try {
    // 1. Obtener IDs
    const papelera = await prisma.category.findUnique({ where: { slug: 'papelera' } });
    const descartables = await prisma.category.findUnique({ where: { slug: 'descartables' } });

    if (!papelera || !descartables) {
      console.log('⚠️ No se encontraron las categorías. Quizás ya fueron unificadas.');
      return;
    }

    // 2. Mover productos
    const moved = await prisma.product.updateMany({
      where: { categoryId: descartables.id },
      data: { categoryId: papelera.id }
    });
    console.log(`✅ ${moved.count} productos movidos.`);

    // 3. Eliminar categoría
    await prisma.category.delete({ where: { id: descartables.id } });
    console.log('✅ Categoría Descartables eliminada.');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
