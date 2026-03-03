import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export const runtime = 'nodejs';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const files = formData.getAll('files');

        if (!files || files.length === 0) {
            return NextResponse.json({ error: 'No se recibieron archivos' }, { status: 400 });
        }

        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        await mkdir(uploadDir, { recursive: true });

        const urls = [];

        for (const file of files) {
            if (!file || typeof file === 'string') continue;

            // Validar tipo
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
            if (!allowedTypes.includes(file.type)) {
                return NextResponse.json({ error: `Tipo no permitido: ${file.type}` }, { status: 400 });
            }

            // Validar tamaño (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                return NextResponse.json({ error: 'Archivo demasiado grande (máx 5MB)' }, { status: 400 });
            }

            const ext = file.name.split('.').pop().toLowerCase();
            const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
            const filePath = path.join(uploadDir, uniqueName);

            const bytes = await file.arrayBuffer();
            await writeFile(filePath, Buffer.from(bytes));

            urls.push(`/uploads/${uniqueName}`);
        }

        return NextResponse.json({ urls });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Error al subir archivos' }, { status: 500 });
    }
}
