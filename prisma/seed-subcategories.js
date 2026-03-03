const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Creando estructura de subcategorías...');

  const subcategories = [
    // PAPELERA (Parent ID 5)
    { name: 'Bolsas', slug: 'bolsas', parentId: 5, displayOrder: 1 },
    { name: 'Embalaje', slug: 'embalaje', parentId: 5, displayOrder: 2 },
    { name: 'Oficina y Comercio', slug: 'oficina-comercio', parentId: 5, displayOrder: 3 },

    // COTILLÓN (Parent ID 2)
    { name: 'Decoración', slug: 'decoracion', parentId: 2, displayOrder: 1 },
    { name: 'Accesorios', slug: 'accesorios', parentId: 2, displayOrder: 2 },
    { name: 'Efectos', slug: 'efectos', parentId: 2, displayOrder: 3 },

    // REPOSTERÍA (Parent ID 6)
    { name: 'Descartables Repostería', slug: 'descartables-reposteria', parentId: 6, displayOrder: 1 },
    { name: 'Utensilios', slug: 'utensilios', parentId: 6, displayOrder: 2 },
    { name: 'Materia Prima y Deco', slug: 'materia-prima-deco', parentId: 6, displayOrder: 3 },
  ];

  for (const sub of subcategories) {
    await prisma.category.upsert({
      where: { slug: sub.slug },
      update: sub,
      create: sub,
    });
    console.log(`✅ Subcategoría: ${sub.name}`);
  }

  console.log('🚀 Estructura completada.');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
