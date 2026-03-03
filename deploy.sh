#!/bin/bash
# =============================================================
# SCRIPT DE DEPLOY — COTYPACK
# Uso: bash deploy.sh [usuario@ip] [directorio_destino]
# Ejemplo: bash deploy.sh root@168.231.98.115 /var/www/cotypack
# =============================================================

set -e

SERVER=${1:-"root@168.231.98.115"}
DEPLOY_DIR=${2:-"/var/www/cotypack"}
APP_NAME="cotypack"

echo "🚀 Iniciando deploy de Cotypack en $SERVER..."

# 1. Build local
echo "📦 Construyendo aplicación..."
npm run build

# 2. Crear directorio en servidor
echo "📁 Preparando servidor..."
ssh $SERVER "mkdir -p $DEPLOY_DIR/prisma $DEPLOY_DIR/public/uploads"

# 3. Sincronizar archivos
echo "📤 Subiendo archivos..."
rsync -avz --delete \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='.env' \
  --exclude='prisma/cotypack.db' \
  ./ $SERVER:$DEPLOY_DIR/

# 4. Instalar dependencias en servidor
echo "📦 Instalando dependencias..."
ssh $SERVER "cd $DEPLOY_DIR && npm ci --omit=dev"

# 5. Configurar .env si no existe
echo "⚙️  Verificando configuración..."
ssh $SERVER "
  if [ ! -f $DEPLOY_DIR/.env ]; then
    echo '⚠️  ATENCIÓN: No existe .env en el servidor.'
    echo '    Crea el archivo $DEPLOY_DIR/.env con:'
    echo '    DATABASE_URL=file:./prisma/cotypack.db'
    echo '    JWT_SECRET=tu_clave_secreta_aqui'
    echo '    NEXT_PUBLIC_SITE_URL=http://tu-dominio.com'
  fi
"

# 6. Migrar base de datos
echo "🗄️  Ejecutando migraciones..."
ssh $SERVER "cd $DEPLOY_DIR && npx prisma migrate deploy"

# 7. Seed si es primera vez (solo si no existe la DB)
ssh $SERVER "
  if [ ! -f $DEPLOY_DIR/prisma/cotypack.db ]; then
    echo '🌱 Ejecutando seed inicial...'
    cd $DEPLOY_DIR && node prisma/seed.js
  fi
"

# 8. Iniciar/reiniciar con PM2
echo "🔄 Reiniciando aplicación..."
ssh $SERVER "
  cd $DEPLOY_DIR
  pm2 describe $APP_NAME > /dev/null 2>&1 && pm2 reload $APP_NAME || pm2 start ecosystem.config.js
  pm2 save
"

echo ""
echo "✅ Deploy completado!"
echo "🌐 Sitio disponible en: http://$SERVER:3000"
echo "🔑 Admin: http://$SERVER:3000/admin"
echo ""
echo "📝 Si es la primera vez, recordá:"
echo "   1. Configurar $DEPLOY_DIR/.env en el servidor"
echo "   2. Configurar Nginx como proxy reverso (puerto 3000)"
echo "   3. Cambiar la contraseña del admin en producción"
