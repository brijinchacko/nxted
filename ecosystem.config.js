module.exports = {
  apps: [
    {
      name: 'nxted-ai',
      script: 'node_modules/.bin/next',
      args: 'start --port 3001',
      cwd: '/var/www/nxtedai',
      env: {
        NODE_ENV: 'production',
        PORT: '3001',
      },
      instances: 1,
      autorestart: true,
      max_memory_restart: '1G',
      error_file: '/var/log/pm2/nxted-error.log',
      out_file: '/var/log/pm2/nxted-out.log',
    },
  ],
};
