const dgram = require('dgram');
const message = Buffer.from('Hello');
const client = dgram.createSocket('udp4');
client.send(message, 5432, 'localhost', (err) => {
  client.close();
});

client.on('message', (msg, rinfo) => {
    console.log(`client got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  });