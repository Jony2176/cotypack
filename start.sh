#!/bin/sh
# Copy DB to persistent volume if not exists
if [ ! -f /data/cotypack.db ]; then
  echo "Initializing database on persistent volume..."
  cp /app/prisma/cotypack.db /data/cotypack.db
fi
exec node server.js
