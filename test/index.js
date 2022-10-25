const qrcode = require("qrcode-terminal");

const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");

const media = MessageMedia.fromFilePath(
  "/home/roro/Desktop/jaah/jaah-whatssapp-web-js/test/sample.pdf"
);

const client = new Client({
  authStrategy: new LocalAuth()
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

const isRegisteredNumber = async ()=>{
  return await client.isRegisteredUser("962123456789@c.us");
  
}  

console.log(isRegisteredNumber());

client.on('authenticated', (session) => {    

  // Save the session object however you prefer.
  // Convert it to json, save it to a file, store it in a database...
});


client.on('auth_failure', msg => {
  // Fired if session restore was unsuccessful
  console.error('AUTHENTICATION FAILURE', msg);
});


/* ارسال رسائل ميديا*/
// client.on('ready', async() => {
//     await client.sendMessage("962788600975@c.us", media)
//  })
client.initialize();
console.log("Sucessfully initialized");



/**طباعه الرسالة المرسلة الي */
// client.on('message', message => {
// 	console.log(message);
// });

/** الرد على رسالة قادمة */
// client.on("message", async (msg) => {
//   const chat = await msg.getChat();
//   await chat.sendMessage(media);
// });
