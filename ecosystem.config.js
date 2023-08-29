module.exports = {
  apps: [
    {
      name: 'front.letsgoeurope.fr',
      instances: "max",
      exec_mode: "cluster",
      script: 'node_modules/.bin/next',
      args: 'start -p 3000',
      watch: true,
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
