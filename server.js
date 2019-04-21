const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const client = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  client.send('hi', 5433, 'localhost', (err) => {
    console.log("failed to send");
  });
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(5432);
// Prints: server listening 0.0.0.0:5432