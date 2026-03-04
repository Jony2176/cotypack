const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const products = await prisma.product.findMany();
    
    for (const p of products) {
        let currentImages = JSON.parse(p.images || '[]');
        // Filtrar imágenes que vienen del inbound (screenshots de Telegram)
        const cleanImages = currentImages.filter(img => !img.includes('/inbound/') && !img.includes('v1.jpg') && !img.includes('v2.jpg') && !img.includes('v3.jpg') && !img.includes('orig.jpg'));
        
        // Mantener solo las que vienen del RAR (están en /images/products/...) 
        // o las procesadas legítimamente.
        // Pero el usuario dice que los "screenshots" no van.
        
        // Específicamente para los que acabamos de tocar:
        if (p.slug === 'cinta-adhesiva-globos') {
            await prisma.product.update({
                where: { id: p.id },
                data: { images: JSON.stringify(['/images/products/cinta-adhesiva-globos-v2.jpg']) } // Dejar la de catálogo
            });
        }
        
        if (p.slug === 'cinta-acetato-arcos-globos') {
            await prisma.product.update({
                where: { id: p.id },
                data: { images: JSON.stringify(['/images/products/cinta-acetato-v2.jpg', '/images/products/cinta-acetato-v3.jpg']) }
            });
        }

        // Para los demás, si la imagen principal parece un screenshot (trae datos del inbound), la removemos
        const finalImages = currentImages.filter(img => {
            const isScreenshot = img.includes('file_') || img.includes('inbound');
            return !isScreenshot;
        });

        if (finalImages.length !== currentImages.length) {
            await prisma.product.update({
                where: { id: p.id },
                data: { images: JSON.stringify(finalImages) }
            });
            console.log(`Limpiadas imágenes de: ${p.name}`);
        }
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
