const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const message = Buffer.from('Hello');
client.send(message, 5432, 'localhost', (err) => {
  client.close();
});

client.on('message', (msg, rinfo) => {
    console.log(`client got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});