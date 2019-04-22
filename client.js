/**
 * --- CLIENT.JS ---
 * Author: Gabriel Barrera
 * Programming Assignment 2
 * CS 576, Prof. Wang
 * 
 * A client program binded to port 5433 that posts 
 * string data to a server for concatenation.
 * 
 * Instructions: 
 * - Run client with 'node client.js'
 * - Enter a string to be concatenated
 * - Press 'ENTER/RETURN' key to send to server
 * - Concatenated string is returned to command line
 * - If program is stuck, use "Ctrl+C" to terminate program
 */
const inquire = require('inquirer');        // Read user input module
const dgram = require('dgram');             // UDP module
const client = dgram.createSocket('udp4');  // Create UDP socket

// User input prompt
var questions = [{
  type: 'input',
  name: 'input',
  message: "Input string to be sent: ",
}];

// Prompt user for input string
inquire.prompt(questions).then(answers => {
  // Store user input in buffer to be sent to server
  const message = Buffer.from(`${answers['input']}`);

  // Send message to server
  client.send(message, 5432, 'localhost', function(error){
    if(error) client.close(); // Terminate on error
    else console.log(`*** Sent "${message}" ***`);
  });

  // Accept incoming message from server
  client.on('message', (msg, info) => {
    console.log(`CLIENT received:\n  ${msg}\nSENDER: ${info.address}:${info.port}`);
    client.close(); // End program when concatenation complete
  });
});

client.bind(5433); // Set client port to 5433