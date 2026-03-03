const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Migrando productos a subcategorías...');

  // Obtener todas las subcategorías
  const subcats = await prisma.category.findMany({
    where: { parentId: { not: null } }
  });

  const subcatMap = {};
  subcats.forEach(sc => subcatMap[sc.slug] = sc.id);

  // Reglas de migración basadas en palabras clave en el nombre del producto
  const rules = [
    // PAPELERA - Bolsas
    { keywords: ['bolsa', 'riñon', 'arranque', 'camiseta', 'polipropileno'], subcat: 'bolsas' },
    
    // PAPELERA - Embalaje
    { keywords: ['cinta', 'precinto', 'film', 'stretch', 'adhesiva', 'fragil', 'papel kraft'], subcat: 'embalaje' },
    
    // PAPELERA - Oficina y Comercio
    { keywords: ['rollo', 'etiquetadora', 'broche', 'boligrafo', 'lapicera', 'factura'], subcat: 'oficina-comercio' },
    
    // COTILLÓN - Decoración
    { keywords: ['globo', 'banner', 'guirnalda', 'serpentinas', 'confetti', 'centro', 'mesa', 'vela', 'balde'], subcat: 'decoracion' },
    
    // COTILLÓN - Accesorios
    { keywords: ['gorro', 'corona', 'pito', 'matraca', 'cotillon', 'princesas', 'superheroes', 'disfraz'], subcat: 'accesorios' },
    
    // COTILLÓN - Efectos
    { keywords: ['espuma', 'nieve', 'serpentina', 'lanza', 'estallido', 'humo', 'luces', 'led'], subcat: 'efectos' },
    
    // REPOSTERÍA - Descartables Repostería
    { keywords: ['plato', 'vaso', 'bandeja', 'pirotin', 'blonda', 'muffin', 'cupcake', 'set vajilla', 'mantel'], subcat: 'descartables-reposteria' },
    
    // REPOSTERÍA - Utensilios
    { keywords: ['manga', 'pico', 'espatula', 'cuchara', 'batidor', 'pincel', 'cortante', 'molde'], subcat: 'utensilios' },
    
    // REPOSTERÍA - Materia Prima y Deco
    { keywords: ['colorante', 'sprinkles', 'perla', 'chocolate', 'glase', 'fondant', 'decoracion torta'], subcat: 'materia-prima-deco' },
  ];

  // Obtener todos los productos activos
  const products = await prisma.product.findMany({
    where: { active: true },
    include: { category: true }
  });

  let migrated = 0;

  for (const product of products) {
    const nameLower = product.name.toLowerCase();
    let matchedSubcat = null;

    // Buscar coincidencia
    for (const rule of rules) {
      if (rule.keywords.some(kw => nameLower.includes(kw))) {
        matchedSubcat = rule.subcat;
        break;
      }
    }

    if (matchedSubcat && subcatMap[matchedSubcat]) {
      await prisma.product.update({
        where: { id: product.id },
        data: { categoryId: subcatMap[matchedSubcat] }
      });
      console.log(`✅ ${product.name} → ${matchedSubcat}`);
      migrated++;
    }
  }

  console.log(`\n🎉 Migrados ${migrated} productos a subcategorías`);
  console.log(`📦 ${products.length - migrated} productos permanecen en categorías padre`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
