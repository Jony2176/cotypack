const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Unificando Embalaje en Papelera...');

  // 1. Obtener los IDs de las categorías
  const papelera = await prisma.category.findUnique({ where: { slug: 'papelera' } });
  const embalaje = await prisma.category.findUnique({ where: { slug: 'embalaje' } });

  if (!papelera || !embalaje) {
    console.error('❌ No se encontraron las categorías necesarias.');
    return;
  }

  // 2. Mover productos de Embalaje a Papelera
  const moved = await prisma.product.updateMany({
    where: { categoryId: embalaje.id },
    data: { categoryId: papelera.id }
  });
  console.log(`✅ ${moved.count} productos movidos de Embalaje a Papelera.`);

  // 3. Actualizar descripción de Papelera
  await prisma.category.update({
    where: { id: papelera.id },
    data: {
      description: 'Bolsas, cintas, rollos, film stretch, precintos y todo en artículos de papelera y embalaje'
    }
  });
  console.log('✅ Descripción de Papelera actualizada.');

  // 4. Eliminar categoría Embalaje
  await prisma.category.delete({ where: { id: embalaje.id } });
  console.log('✅ Categoría Embalaje eliminada.');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
