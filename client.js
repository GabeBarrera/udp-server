const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const message = Buffer.from('Hello');
client.send(message, 5432, 'localhost', (err) => {});

client.on('message', (msg, rinfo) => {
    console.log(`client got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    client.close();
});

client.on('listening', () => {
  const address = client.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

// client.bind(5433);