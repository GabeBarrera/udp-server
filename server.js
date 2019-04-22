/**
 * --- SERVER.JS ---
 * Author: Gabriel Barrera
 * Programming Assignment 2
 * CS 576, Prof. Wang
 * 
 * A server program binded to port 5432 that  
 * receives string data from a client program,
 * concatenates the string with a funny
 * message, then return string back to the
 * client
 * 
 * Instructions: 
 * - Run server with 'node server.js'
 * - Shut down with 'Ctrl+C'
 */
const dgram = require('dgram');             // UDP Module
const server = dgram.createSocket('udp4');  // UDP Socket

// If an error, log and quit
server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

// Accept incoming messages from a client
server.on('message', (msg, rinfo) => {
  console.log(`SERVER received: \n  ${msg}\nSENDER: ${rinfo.address}:${rinfo.port}`);

  // Concatenate client string with funny message
  concatString = msg + " - Don't eat yellow snow";

  // Return concatenated string back to client
  server.send(concatString,5433,'localhost',function(error){
    if(error) client.close();
    else console.log('*** Returned concatenated string ***\n');
  });
});

// Display server socket address and port
server.on('listening', () => {
  const address = server.address();
  console.log(`SERVER listening ${address.address}:${address.port}`);
});

server.bind(5432); // Set server port to 5432