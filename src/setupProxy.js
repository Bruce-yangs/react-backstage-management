const {createProxyMiddleware} = require('http-proxy-middleware');
const proxyDomain = "http://admin.xsgz.com";
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: proxyDomain,
      // target: 'http://localhost:3000',
      changeOrigin: true/*,
      pathRewrite: {
        '^/api': ''
      },*/
    })
  );
};