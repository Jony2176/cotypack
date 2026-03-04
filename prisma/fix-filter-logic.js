const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // 1. Mover todos los productos de categorías PADRE a sus subcategorías para que el filtro sea consistente
    const products = await prisma.product.findMany({ include: { category: true } });
    
    for (const p of products) {
        if (p.categoryId === 2) { // Cotillón (Padre) -> Mover a Decoración
            await prisma.product.update({ where: { id: p.id }, data: { categoryId: 10 } });
        } else if (p.categoryId === 5) { // Papelera (Padre) -> Mover a Embalaje o Bolsas
            const targetId = p.name.toLowerCase().includes('bolsa') ? 7 : 8;
            await prisma.product.update({ where: { id: p.id }, data: { categoryId: targetId } });
        } else if (p.categoryId === 6) { // Repostería (Padre) -> Mover a Descartables
            await prisma.product.update({ where: { id: p.id }, data: { categoryId: 13 } });
        }
    }
    console.log('Migración completa: productos movidos de categorías padre a hijas.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
