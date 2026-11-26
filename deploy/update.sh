#!/usr/bin/env bash
# Mise à jour du site après un push sur GitHub (à lancer sur le serveur).
set -euo pipefail
cd /var/www/ntk-production
git pull --ff-only
npm ci
npm run build
pm2 reload ntk-production
echo "Mise à jour terminée."
