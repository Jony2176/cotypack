/**
 * Genera un slug a partir de un texto.
 * Ej: "Mesa de cumpleaños" => "mesa-de-cumpleanos"
 */
export function slugify(text) {
    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

/**
 * Formatea un precio en pesos argentinos.
 */
export function formatPrice(price) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
}

/**
 * Parsea el array de imágenes guardado como string JSON.
 */
export function parseImages(imagesStr) {
    try {
        return JSON.parse(imagesStr || '[]');
    } catch {
        return [];
    }
}

/**
 * Devuelve la primera imagen de un producto o el placeholder.
 */
export function getProductImage(product) {
    const images = parseImages(product.images);
    return images[0] || null;
}

/**
 * Devuelve el array completo de imágenes de un producto.
 */
export function getProductImages(product) {
    return parseImages(product.images);
}

/**
 * Parsea las variantes.
 */
export function parseVariants(variantsStr) {
    try {
        return JSON.parse(variantsStr || '[]');
    } catch {
        return [];
    }
}

/**
 * Devuelve el precio a mostrar (Desde $X) o el precio base.
 */
export function getProductDisplayPrice(product) {
    const variants = parseVariants(product.variants);
    if (variants.length > 0) {
        // Encontrar el precio base mas bajo de todas las variantes
        const minP = Math.min(...variants.map(v => Number(v.price) || 0));
        return { isRange: true, minPrice: minP };
    }
    return { isRange: false, minPrice: product.price };
}
