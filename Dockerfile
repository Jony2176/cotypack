FROM node:20-alpine AS base

# Instalar dependencias del sistema
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Instalar dependencias
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Generar Prisma client
RUN npx prisma generate

# Build Next.js
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar archivos necesarios
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Crear directorio de uploads y base de datos
RUN mkdir -p public/uploads && chown -R nextjs:nodejs public/uploads
RUN mkdir -p prisma && chown -R nextjs:nodejs prisma

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
