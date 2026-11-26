#!/usr/bin/env bash
# Installation initiale sur un VPS Ubuntu/Debian (à lancer une seule fois, en root).
# Usage : sudo DOMAIN=ntkproduction.com EMAIL=contact@exemple.com bash setup-server.sh
set -euo pipefail
DOMAIN="${DOMAIN:?DOMAIN requis}"
EMAIL="${EMAIL:?EMAIL requis pour le certificat HTTPS}"
APP_DIR=/var/www/ntk-production
REPO=https://github.com/ifoustanis34-ops/ntkproducion.git

apt-get update
apt-get install -y curl git nginx certbot python3-certbot-nginx ufw
if ! command -v node >/dev/null || [ "$(node -p 'process.versions.node.split(".")[0]')" -lt 20 ]; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi
npm install -g pm2

[ -d "$APP_DIR/.git" ] || git clone "$REPO" "$APP_DIR"
cd "$APP_DIR"
echo "NEXT_PUBLIC_SITE_URL=https://$DOMAIN" > .env.production.local
npm ci
npm run build
pm2 start deploy/ecosystem.config.cjs
pm2 save
pm2 startup systemd -u root --hp /root

sed "s/ntkproduction.com/$DOMAIN/g" deploy/nginx-ntkproduction.conf > /etc/nginx/sites-available/ntk-production
ln -sf /etc/nginx/sites-available/ntk-production /etc/nginx/sites-enabled/ntk-production
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

ufw allow OpenSSH && ufw allow 'Nginx Full' && ufw --force enable
certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --redirect --agree-tos -m "$EMAIL" -n
echo "Site en ligne : https://$DOMAIN"
