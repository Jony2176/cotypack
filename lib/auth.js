import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

const SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'cotypack_secret_key'
);

export async function hashPassword(password) {
    return bcrypt.hash(password, 12);
}

export async function comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
}

export async function createToken(payload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(SECRET);
}

export async function verifyToken(token) {
    try {
        const { payload } = await jwtVerify(token, SECRET);
        return payload;
    } catch {
        return null;
    }
}

export async function getAdminFromRequest(request) {
    const cookie = request.cookies?.get?.('admin_token')?.value
        || request.headers?.get?.('cookie')?.match(/admin_token=([^;]+)/)?.[1];
    if (!cookie) return null;
    return verifyToken(cookie);
}

export async function isMayorista(cookieStore) {
    const token = (await cookieStore).get('mayorista_token')?.value;
    if (!token) return false;
    const payload = await verifyToken(token);
    return payload?.role === 'mayorista';
}
