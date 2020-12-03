// server.js
const app = require('./backend/app');
const debug = require('debug')('node-angular');
const http = require('http');
const util = require('./backend/shared/util');

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + port;
  debug('Listening on ' + bind);
};

const port = util.normalizePort(process.env.PORT || '8080');
console.log('App now running on port', port);
app.set('port', port);

const server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);
server.listen(port);

const io = require('socket.io')(server, { path: '/api/socket.io' });
const Invoice = require('./backend/models/invoice');
const User = require('./backend/models/user');
const Contract = require('./backend/models/contract');
const Contractor = require('./backend/models/contractor');

io.on('connection', (socket) => {
  User.watch().on('change', (data) => {
    socket.emit('users', data);
  });
  Invoice.watch().on('change', (data) => {
    socket.emit('invoices', data);
  });
  Contract.watch().on('change', (data) => {
    socket.emit('contracts', data);
  });
  Contractor.watch().on('change', (data) => {
    socket.emit('contractors', data);
  });
});
