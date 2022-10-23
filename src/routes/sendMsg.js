var express = require("express");
var router = express.Router();
// const {initializeWhatssAppWeb} = require(".././services")
const { body, validationResult } = require('express-validator');
const { phoneNumberFormatter } = require('../.././helpers/formatter');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require("qrcode-terminal");
const socketIO = require('socket.io');

const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
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

    client.on("auth_failure", function (session) {
      socket.emit("message", "Auth failure, restarting...");
    });

    client.on("disconnected", (reason) => {
      socket.emit("message", "Whatsapp is disconnected!");
      client.destroy();
      client.initialize();
    });
  });
};

// Send message
router.post('/', [
  body('number').notEmpty(),
  body('message').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req).formatWith(({
    msg
  }) => {
    return msg;
  });

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: errors.mapped()
    });
  }
// initialize the application
  initializeWhatssAppWeb();

  const number = phoneNumberFormatter(req.body.number);
  const message = req.body.message;

  // const isRegisteredNumber = await checkRegisteredNumber(number);
  console.log(`number: ${number}, message: ${message}`);

  // if (!isRegisteredNumber) {
  //   return res.status(422).json({
  //     status: false,
  //     message: 'The number is not registered'
  //   });
  // }
  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
    console.log("qr")
  });
  
  client.on('ready', () => {
    client.sendMessage(number, message).then(response => {
      res.status(200).json({
        status: true,
        response: response
      });
    }).catch(err => {
      res.status(500).json({
        status: false,
        response: err
      });
      console.log(err)
    });
    })

    client.initialize();
    console.log("Sucessfully initialized");
    
});

module.exports = router;

/*
  body example = 
    {
      number: 962799849386,
      message: "the number is not registered"
    }
  
 */