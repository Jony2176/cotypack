const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const category = await prisma.category.findFirst({ where: { name: { contains: 'Papelera' } } });
  const catId = category ? category.id : null;
  const desc = (forma) => `Práctica y resistente, ideal para viandas, catering y delivery. Apta para microondas.\n\n• Forma: ${forma}\n• Medidas: 23x18x05 cm\n• Presentación: Pack x100 unidades.\n• Apta frío y calor`;

  const productos = [
    {
      name: 'Bandeja Descartable Cod.105 Oval (Pack x100)',
      slug: 'bandeja-descartable-cod-105-oval-x100',
      description: desc('Oval'),
      images: ['/images/products/bandeja-105-oval.png', '/images/products/propaganda-band-105-oval.jpg'],
    },
    {
      name: 'Bandeja Descartable Cod.105 Rectangular (Pack x100)',
      slug: 'bandeja-descartable-cod-105-rec-x100',
      description: desc('Rectangular'),
      images: ['/images/products/bandeja-105-rec.png', '/images/products/propaganda-band-105-rec.jpg'],
    },
  ];

  for (const p of productos) {
    await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: 7000,
        stock: 100,
        variants: '[]',
        images: JSON.stringify(p.images),
        categoryId: catId,
        active: true,
        featured: false,
      }
    });
    console.log('Creado:', p.name);
  }
}
main().catch(console.error).finally(async () => { await new PrismaClient().$disconnect(); });
