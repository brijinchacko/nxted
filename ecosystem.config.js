module.exports = {
  apps: [
    {
      name: "nxted",
      script: "node_modules/.bin/next",
      args: "start",
      cwd: "/var/www/nxted",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3010,
      },
      error_file: "/var/log/pm2/nxted-error.log",
      out_file: "/var/log/pm2/nxted-out.log",
      log_file: "/var/log/pm2/nxted-combined.log",
      time: true,
    },
  ],
};
