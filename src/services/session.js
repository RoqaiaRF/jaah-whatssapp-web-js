const { setUserVars,  getUserVars, delUserVars}= require('../../redis');
const qrcode = require("qrcode");
const qrcodeTerminal = require("qrcode-terminal");
const { Client, LocalAuth} = require("whatsapp-web.js");
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);


// create a new session
const createSession = async (sender, description) => {

    console.log('Creating session: ' + sender);
    const client = new Client({
      restartOnAuthFail: true,
      puppeteer: {
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process', // <- this one doesn't works in Windows
          '--disable-gpu'
        ],
      },
      authStrategy: new LocalAuth({
        clientId: sender
      })
    });
  
    client.initialize();
  
    client.on('qr', (qr) => {
      console.log('QR RECEIVED', qr);
      // print qr code in console
      qrcodeTerminal.generate(qr, { small: true });

      qrcode.toDataURL(qr, (err, url) => {
        io.emit('qr', { id: sender, src: url });
        io.emit('message', { id: sender, text: 'QR Code received, scan please!' });
      });
    });
  
    client.on('ready', () => {
      io.emit('ready', { id: sender });
      io.emit('message', { id: sender, text: 'Whatsapp is ready!' });
    });
  
    client.on('authenticated', () => {
      io.emit('authenticated', { id: sender });
      io.emit('message', { id: sender, text: 'Whatsapp is authenticated!' });
    });
  
    client.on('auth_failure', function() {
      io.emit('message', { id: sender, text: 'Auth failure, restarting...' });
    });
  
    client.on('disconnected', (reason) => {
      io.emit('message', { id: sender, text: 'Whatsapp is disconnected!' });
      client.destroy();
      client.initialize();
      //Delete session from redis
      delUserVars(sender)

    });
  
    setUserVars(sender, description);
    console.log(`Session created Successfully! : ${sender}`)
}
/*
// get session from redis
const getSession = async(sender) =>{
    let result = await getUserVars(sender);
    console.log(`Session is :  ${result}`)
    return result;

}
*/
module.exports = {
     createSession,
    //  getSession
    };