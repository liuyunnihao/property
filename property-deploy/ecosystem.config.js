module.exports = {
  apps: [
    {
      name: 'property-server',
      cwd: '/var/www/property/server',
      script: 'dist/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/var/www/property/logs/error.log',
      out_file: '/var/www/property/logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss'
    }
  ]
}
