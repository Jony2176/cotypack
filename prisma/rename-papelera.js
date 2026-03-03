const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Cambiando Papelería a Papelera...');

  try {
    await prisma.category.update({
      where: { slug: 'papeleria' },
      data: {
        name: 'Papelera',
        slug: 'papelera',
      }
    });
    console.log('✅ Categoría actualizada exitosamente.');
  } catch (error) {
    console.error('❌ Error al actualizar:', error.message);
  }
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
