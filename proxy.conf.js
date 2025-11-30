const PROXY_CONFIG = [
  {
    context: ['/api/**'],
    target: 'http://localhost:8080',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug'
  },
  {
    context: ['/api-get/**'],
    target: 'http://localhost:8081',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: {
      '^/api-get': '/api'
    }
  }
];

module.exports = PROXY_CONFIG;
