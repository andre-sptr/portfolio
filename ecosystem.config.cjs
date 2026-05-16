// PM2 Ecosystem Config
// Untuk mengelola API proxy server di VPS
// Usage: pm2 start ecosystem.config.cjs

module.exports = {
  apps: [
    {
      name: "andresptr-chat-api",
      script: "./server.mjs",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "200M",
      env: {
        NODE_ENV: "production",
        API_PORT: 3001,
      },
      // Log configuration
      error_file: "./logs/api-error.log",
      out_file: "./logs/api-out.log",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
    },
  ],
};
