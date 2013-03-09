var hapi = require('hapi');
var server = module.exports = new hapi.Server('127.0.0.1', 3000);

server.addRoute({
  path: '/{path*}',
  method: 'GET',
  handler: {
    directory: {
      path: './public',
      listing: false,
      index: true
    }
  }
});

if (!module.parent) {
  server.start();
}
