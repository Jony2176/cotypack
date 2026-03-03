const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const categories = [
    { name: 'Globos y Decoración', slug: 'globos-decoracion', description: 'Globos de látex, metalizados, orbitales y toda la decoración para tus fiestas', displayOrder: 1 },
    { name: 'Cotillón', slug: 'cotillon', description: 'Gorros, matracas, confetti, serpentinas y accesorios para animar la fiesta', displayOrder: 2 },
    { name: 'Vajilla Descartable', slug: 'vajilla-descartable', description: 'Platos, vasos, cubiertos y manteles descartables para tus eventos', displayOrder: 3 },
    { name: 'Piñatas', slug: 'pinatas', description: 'Piñatas de carton, tela y con personajes de moda', displayOrder: 4 },
    { name: 'Bolsas y Empaques', slug: 'bolsas-empaques', description: 'Bolsitas de regalo, cajas y empaques personalizados', displayOrder: 5 },
    { name: 'Temático Infantil', slug: 'tematico-infantil', description: 'Todo lo necesario para cumpleaños infantiles temáticos', displayOrder: 6 },
];

const productTemplates = [
    // Globos
    { name: 'Globos de Látex Pastel x50', slug: 'globos-latex-pastel-x50', description: 'Pack de 50 globos de látex en colores pastel. Disponibles en varios colores. Ideales para decorar cumpleaños y fiestas.', price: 1800, stock: 150, featured: true, categorySlug: 'globos-decoracion' },
    { name: 'Globos Metalizados 45cm', slug: 'globos-metalizados-45cm', description: 'Globos metalizados de alta calidad, 45cm inflados. Disponibles en dorado, plateado, rosado y azul.', price: 850, stock: 200, featured: true, categorySlug: 'globos-decoracion' },
    { name: 'Globo Número 1 Dorado', slug: 'globo-numero-1-dorado', description: 'Globo metálico con número 1 en color dorado brillante. 70cm de alto. Perfecto para el primer cumpleaños.', price: 1200, comparePrice: 1500, stock: 80, featured: false, categorySlug: 'globos-decoracion' },
    { name: 'Globo Número 2 Rosado', slug: 'globo-numero-2-rosado', description: 'Globo metálico con número 2 en color rosado. 70cm de alto.', price: 1200, stock: 80, featured: false, categorySlug: 'globos-decoracion' },
    { name: 'Kit Decoración Arco de Globos', slug: 'kit-arco-globos', description: 'Kit completo para armar un arco de globos: 100 globos surtidos, tira armadora, pegamento de punto y cinta.', price: 4500, comparePrice: 5500, stock: 30, featured: true, categorySlug: 'globos-decoracion' },
    { name: 'Globos Transparentes x10', slug: 'globos-transparentes-x10', description: 'Globos de látex transparentes para relleno con confetti o plumas. Pack de 10 unidades.', price: 900, stock: 120, featured: false, categorySlug: 'globos-decoracion' },
    { name: 'Banner Happy Birthday Dorado', slug: 'banner-happy-birthday-dorado', description: 'Guirnalda de letras "Happy Birthday" en dorado brillante. 2 metros de largo.', price: 1500, stock: 60, featured: true, categorySlug: 'globos-decoracion' },
    { name: 'Centrotabla Figura Unicornio', slug: 'centrotabla-unicornio', description: 'Figura de centrotabla de unicornio con soporte. Ideal para decorar mesas de dulces. 40cm de alto.', price: 2800, stock: 25, featured: false, categorySlug: 'globos-decoracion' },

    // Cotillón
    { name: 'Gorros de Cumpleaños x10', slug: 'gorros-cumpleanos-x10', description: 'Pack de 10 gorros de cartón para cumpleaños. Colores surtidos con detalles dorados.', price: 1200, stock: 90, featured: false, categorySlug: 'cotillon' },
    { name: 'Matracas de Cartón Surtidas x12', slug: 'matracas-carton-x12', description: 'Pack de 12 matracas de cartón decoradas. Colores surtidos. Ideales para repartir entre los invitados.', price: 900, stock: 110, featured: false, categorySlug: 'cotillon' },
    { name: 'Confetti Circular Dorado 100g', slug: 'confetti-dorado-100g', description: 'Confetti circular en color dorado. 100 gramos. Ideal para lanzar en momentos especiales.', price: 650, stock: 200, featured: false, categorySlug: 'cotillon' },
    { name: 'Serpentinas de Papel x20', slug: 'serpentinas-papel-x20', description: 'Pack de 20 serpentinas de papel de colores. Biodegradables y resistentes.', price: 500, stock: 250, featured: false, categorySlug: 'cotillon' },
    { name: 'Cotillón Temático Princesas x20 piezas', slug: 'cotillon-tematico-princesas', description: 'Set de cotillón temático de princesas: 5 gorros, 5 matracas, 5 bolsitas, 5 pulseras. Para 5 invitadas.', price: 3500, comparePrice: 4200, stock: 40, featured: true, categorySlug: 'cotillon' },
    { name: 'Pito Fiesta Largo x12', slug: 'pito-fiesta-largo-x12', description: 'Pack de 12 pitos de papel metálicos. Se extienden al soplar. Colores surtidos.', price: 800, stock: 150, featured: false, categorySlug: 'cotillon' },

    // Vajilla
    { name: 'Platos Descartables Blancos x10', slug: 'platos-descartables-blancos-x10', description: 'Platos descartables de polipropileno blanco. 23cm de diámetro. Pack de 10 unidades.', price: 450, stock: 300, featured: false, categorySlug: 'vajilla-descartable' },
    { name: 'Vasos Descartables Transparentes x25', slug: 'vasos-descartables-transparentes-x25', description: 'Vasos de plástico transparente de 300ml. Pack de 25 unidades. Sin BPA.', price: 600, stock: 280, featured: false, categorySlug: 'vajilla-descartable' },
    { name: 'Set Vajilla Dorada 10 personas', slug: 'set-vajilla-dorada-10-personas', description: 'Set completo para 10 personas: 10 platos dorados, 10 vasos dorados, 10 servilletas doradas y cubiertos metalizados.', price: 3800, comparePrice: 4500, stock: 35, featured: true, categorySlug: 'vajilla-descartable' },
    { name: 'Cubiertos Descartables Dorados x24', slug: 'cubiertos-descartables-dorados-x24', description: 'Set de cubiertos metalizado dorado: 8 tenedores, 8 cuchillos, 8 cucharitas. Resistentes.', price: 1100, stock: 90, featured: false, categorySlug: 'vajilla-descartable' },
    { name: 'Mantel Descartable Rectangular Dorado', slug: 'mantel-descartable-dorado', description: 'Mantel descartable metalizado dorado. 1.8m x 1.2m. Para mesas de hasta 8 personas.', price: 950, stock: 70, featured: false, categorySlug: 'vajilla-descartable' },
    { name: 'Set Vajilla Unicornio 8 personas', slug: 'set-vajilla-unicornio-8-personas', description: 'Vajilla temática de unicornio: platos, vasos y servilletas con diseño de unicornio para 8 personas.', price: 3200, stock: 25, featured: true, categorySlug: 'vajilla-descartable' },

    // Piñatas
    { name: 'Piñata Estrella de Cartón', slug: 'pinata-estrella-carton', description: 'Piñata clásica de cartón en forma de estrella de 7 puntas. 40cm. Se rellena a mano. No incluye relleno.', price: 2200, stock: 40, featured: false, categorySlug: 'pinatas' },
    { name: 'Piñata Unicornio Tela', slug: 'pinata-unicornio-tela', description: 'Piñata de unicornio confeccionada en tela y papel maché. 45cm. Colores pasteles con detalles brillosos.', price: 3500, comparePrice: 4000, stock: 20, featured: true, categorySlug: 'pinatas' },
    { name: 'Piñata Super Mario Tela', slug: 'pinata-super-mario-tela', description: 'Piñata de Super Mario confeccionada artesanalmente en tela. 50cm. Ideal para cumpleaños temáticos.', price: 3800, stock: 15, featured: false, categorySlug: 'pinatas' },
    { name: 'Piñata Dinosaurio Verde', slug: 'pinata-dinosaurio-verde', description: 'Piñata de dinosaurio en verde con espinas azules. 45cm. Para los amantes de los dinos.', price: 3200, stock: 18, featured: false, categorySlug: 'pinatas' },

    // Bolsas
    { name: 'Bolsitas de Regalo Kraft x20', slug: 'bolsitas-regalo-kraft-x20', description: 'Pack de 20 bolsitas de papel kraft con manija. 15x20cm. Ideales para souvenir de cumpleaños.', price: 1400, stock: 100, featured: false, categorySlug: 'bolsas-empaques' },
    { name: 'Cajas con Ventana Blancas x10', slug: 'cajas-ventana-blancas-x10', description: 'Cajas de cartón blancas con ventana transparente. 10x10x5cm. Para alfajores, mini tortas o souvenirs.', price: 1800, stock: 80, featured: false, categorySlug: 'bolsas-empaques' },
    { name: 'Bolsas Celofán Transparentes x50', slug: 'bolsas-celofan-x50', description: 'Pack de 50 bolsas de celofán transparente para golosinas. 15x25cm. Con cierre twist.', price: 700, stock: 200, featured: false, categorySlug: 'bolsas-empaques' },

    // Temático Infantil
    { name: 'Kit Cumpleaños Temático Frozen', slug: 'kit-tematico-frozen', description: 'Kit completo temático de Frozen: banner, globos, vajilla(10p), cotillón(10p) y decoración de mesa. Para 10 niños.', price: 8500, comparePrice: 10000, stock: 20, featured: true, categorySlug: 'tematico-infantil' },
    { name: 'Kit Cumpleaños Temático Cars', slug: 'kit-tematico-cars', description: 'Kit completo temático de Cars: banner, globos, vajilla(10p), cotillón(10p) y decoración de mesa. Para 10 niños.', price: 8500, comparePrice: 10000, stock: 20, featured: true, categorySlug: 'tematico-infantil' },
    { name: 'Kit Cumpleaños Temático Peppa Pig', slug: 'kit-tematico-peppa-pig', description: 'Kit completo temático de Peppa Pig. Todo lo necesario para 10 niños.', price: 8500, stock: 20, featured: true, categorySlug: 'tematico-infantil' },
    { name: 'Velas de Cumpleaños Surtidas x10', slug: 'velas-cumpleanos-surtidas-x10', description: 'Pack de 10 velas de cumpleaños clásicas en colores surtidos. Altura 6cm.', price: 400, stock: 300, featured: false, categorySlug: 'tematico-infantil' },
    { name: 'Vela Número 1 Grande Dorada', slug: 'vela-numero-1-dorada', description: 'Vela en forma de número 1 color dorado brillante. 8cm de alto.', price: 600, stock: 120, featured: false, categorySlug: 'tematico-infantil' },
    { name: 'Toppers para Torta Acrilicos x5', slug: 'toppers-torta-acrilicos-x5', description: 'Set de 5 toppers acrílicos para decorar tortas: estrellitas, corazones y letras. Brillosos.', price: 1200, stock: 60, featured: false, categorySlug: 'tematico-infantil' },
];

async function main() {
    console.log('🌱 Iniciando seed de la base de datos...');

    // Crear admin
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const admin = await prisma.admin.upsert({
        where: { email: 'admin@cotypack.com' },
        update: {},
        create: {
            email: 'admin@cotypack.com',
            password: hashedPassword,
        },
    });
    console.log(`✅ Admin creado: ${admin.email}`);

    // Crear categorías
    const categoryMap = {};
    for (const cat of categories) {
        const created = await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        });
        categoryMap[cat.slug] = created.id;
        console.log(`✅ Categoría: ${created.name}`);
    }

    // Crear productos
    for (const tmpl of productTemplates) {
        const { categorySlug, ...productData } = tmpl;
        await prisma.product.upsert({
            where: { slug: productData.slug },
            update: {},
            create: {
                ...productData,
                images: '[]',
                categoryId: categoryMap[categorySlug] || null,
            },
        });
        console.log(`✅ Producto: ${productData.name}`);
    }

    console.log('\n✨ Seed completado exitosamente!');
    console.log(`\n🔑 Credenciales admin:`);
    console.log(`   Email: admin@cotypack.com`);
    console.log(`   Contraseña: admin123`);
    console.log(`\n⚠️  Cambiá la contraseña luego del primer login en producción.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
