var express = require("express");
var router = express.Router();
const { MessageMedia } = require('whatsapp-web.js');
const { phoneNumberFormatter } = require('../.././helpers/formatter');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require("qrcode-terminal");

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
  authStrategy: new LocalAuth()
});




const initializeWhatssAppWeb = () => {
 
  client.initialize();

  // Socket IO
  io.on("connection", function (socket) {
    socket.emit("message", "Connecting...");

    client.on("qr", (qr) => {
      console.log("QR RECEIVED", qr);
      qrcode.toDataURL(qr, (err, url) => {
        socket.emit("qr", url);
        socket.emit("message", "QR Code received, scan please!");
      });
    });

    client.on("ready", () => {
      socket.emit("ready", "Whatsapp is ready!");
      socket.emit("message", "Whatsapp is ready!");
    });

    client.on("authenticated", () => {
      socket.emit("authenticated", "Whatsapp is authenticated!");
      socket.emit("message", "Whatsapp is authenticated!");
      console.log("AUTHENTICATED");
    });
/*
    client.on("auth_failure", function (session) {
      socket.emit("message", "Auth failure, restarting...");
    });
*/
    client.on("disconnected", (reason) => {
      socket.emit("message", "Whatsapp is disconnected!");
      client.destroy();
      client.initialize();
    });
  });
};



// Send media
router.post('/', async (req, res) => {
    const number = phoneNumberFormatter(req.body.number);
    const caption = req.body.caption;
    const fileUrl = req.body.file;
  
    let mimetype;
    const attachment = await axios.get(fileUrl, {
      responseType: 'arraybuffer'
    }).then(response => {
      mimetype = response.headers['content-type'];
      return response.data.toString('base64');
    });
  
    const media = new MessageMedia(mimetype, attachment, 'Media');
    initializeWhatssAppWeb();

    client.sendMessage(number, media, {
      caption: caption
    }).then(response => {
      res.status(200).json({
        status: true,
        response: response
      });
    }).catch(err => {
      res.status(500).json({
        status: false,
        response: err
      });
    });
  });
  
  module.exports = router