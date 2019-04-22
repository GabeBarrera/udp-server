const inquire = require('inquirer');
const dgram = require('dgram');
const client = dgram.createSocket('udp4');

var questions = [{
  type: 'input',
  name: 'input',
  message: "What would you like to send?",
}]

inquire.prompt(questions).then(answers => {
  const message = Buffer.from(`${answers['input']}`);

  client.send(message, 5432, 'localhost');

  client.on('message', (msg, info) => {
    console.log(`receiver got: ${msg} from ${info.address}:${info.port}`);
  });
})

client.bind(5433);