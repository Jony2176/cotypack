const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const category = await prisma.category.findFirst({ where: { name: { contains: 'Papelera' } } });
  await prisma.product.create({
    data: {
      name: 'Cinta de Embalaje Transparente',
      slug: 'cinta-embalaje-transparente',
      description: 'Ideal para cerrar cajas y paquetes con firmeza y seguridad.\n\n• Ancho: 4 cm\n• Largo: 100 mts\n• Excelente adhesión\n• Alta resistencia',
      price: 2500,
      stock: 100,
      variants: '[]',
      images: JSON.stringify(['/images/products/cinta-embalaje.png']),
      categoryId: category ? category.id : null,
      active: true,
      featured: false,
    }
  });
  console.log('Creado: Cinta de Embalaje Transparente');
}
main().catch(console.error).finally(async () => { await new PrismaClient().$disconnect(); });
