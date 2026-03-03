const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Update existing categories to match real business
  console.log('🔄 Actualizando categorías...');

  // 1. Papelería (was "Bolsas y Empaques")
  await prisma.category.update({
    where: { slug: 'bolsas-empaques' },
    data: {
      name: 'Papelería',
      slug: 'papeleria',
      description: 'Bolsas riñón, bolsas arranque, cintas, broches, rollos para etiquetadora y más',
      displayOrder: 1,
    }
  });
  console.log('✅ Papelería');

  // 2. Cotillón (keep, update description)
  await prisma.category.update({
    where: { slug: 'cotillon' },
    data: {
      name: 'Cotillón',
      description: 'Todo para tus fiestas: pelucas, estallidos, decoración y accesorios festivos',
      displayOrder: 2,
    }
  });
  console.log('✅ Cotillón');

  // 3. Vajilla Descartable (keep, rename to Descartables)
  await prisma.category.update({
    where: { slug: 'vajilla-descartable' },
    data: {
      name: 'Descartables',
      slug: 'descartables',
      description: 'Platos, cubiertos, bandejas y vajilla descartable para eventos y gastronomía',
      displayOrder: 3,
    }
  });
  console.log('✅ Descartables');

  // 4. Repostería (was "Temático Infantil")
  await prisma.category.update({
    where: { slug: 'tematico-infantil' },
    data: {
      name: 'Repostería',
      slug: 'reposteria',
      description: 'Insumos para repostería: bandejas, pirotines, blondas, mangas y decoración de tortas',
      displayOrder: 4,
    }
  });
  console.log('✅ Repostería');

  // 5. Embalaje (was "Globos y Decoración")
  await prisma.category.update({
    where: { slug: 'globos-decoracion' },
    data: {
      name: 'Embalaje',
      slug: 'embalaje',
      description: 'Cintas frágil, film stretch, precintos y todo para embalar y despachar',
      displayOrder: 5,
    }
  });
  console.log('✅ Embalaje');

  // 6. Delete Piñatas (not part of the real business)
  // First move any products from piñatas to cotillon
  await prisma.product.updateMany({
    where: { categoryId: 4 },
    data: { categoryId: 2 }
  });
  await prisma.category.delete({ where: { slug: 'pinatas' } });
  console.log('✅ Piñatas eliminada (productos movidos a Cotillón)');

  // Verify
  const cats = await prisma.category.findMany({ orderBy: { displayOrder: 'asc' } });
  console.log('\n📋 Categorías finales:');
  cats.forEach(c => console.log(`  ${c.displayOrder}. ${c.name} (${c.slug})`));
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
