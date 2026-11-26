#!/usr/bin/env bash
# Installation initiale sur un VPS Ubuntu/Debian (à lancer une seule fois, en root).
# Usage : sudo DOMAIN=ntkproduction.com EMAIL=contact@exemple.com [PORT=3000] bash setup-server.sh
# Ne touche pas aux autres sites déjà configurés dans Nginx.
set -euo pipefail
DOMAIN="${DOMAIN:?DOMAIN requis}"
EMAIL="${EMAIL:?EMAIL requis pour le certificat HTTPS}"
PORT="${PORT:-3000}"
APP_DIR=/var/www/ntk-production

if ss -ltn "sport = :$PORT" | grep -q LISTEN && ! pm2 describe ntk-production >/dev/null 2>&1; then
  echo "Le port $PORT est déjà utilisé par une autre application. Relancez avec PORT=3100 (par ex.)." >&2
  exit 1
fi
REPO=https://github.com/ifoustanis34-ops/ntkproducion.git

apt-get update
apt-get install -y curl git nginx certbot python3-certbot-nginx
if ! command -v node >/dev/null || [ "$(node -p 'process.versions.node.split(".")[0]')" -lt 20 ]; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi
command -v pm2 >/dev/null || npm install -g pm2

[ -d "$APP_DIR/.git" ] || git clone "$REPO" "$APP_DIR"
cd "$APP_DIR"
echo "NEXT_PUBLIC_SITE_URL=https://$DOMAIN" > .env.production.local
npm ci
npm run build
PORT="$PORT" pm2 startOrReload deploy/ecosystem.config.cjs --update-env
pm2 save
pm2 startup systemd -u root --hp /root

sed -e "s/ntkproduction.com/$DOMAIN/g" -e "s/127.0.0.1:3000/127.0.0.1:$PORT/" deploy/nginx-ntkproduction.conf > /etc/nginx/sites-available/ntk-production
ln -sf /etc/nginx/sites-available/ntk-production /etc/nginx/sites-enabled/ntk-production
nginx -t && systemctl reload nginx

# Pare-feu volontairement non modifié (serveur partagé avec d'autres sites).
certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --redirect --agree-tos -m "$EMAIL" -n
echo "Site en ligne : https://$DOMAIN"
