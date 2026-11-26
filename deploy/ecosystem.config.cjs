// Configuration pm2 : garde le site en ligne et le relance au redémarrage du serveur.
module.exports = {
  apps: [
    {
      name: "ntk-production",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000 -H 127.0.0.1",
      cwd: __dirname + "/..",
      instances: 1,
      autorestart: true,
      max_memory_restart: "512M",
      env: { NODE_ENV: "production" },
    },
  ],
};
