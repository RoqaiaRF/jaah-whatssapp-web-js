const express = require("express");
const router = express.Router();
const sendMedia = require("./sendMedia");
const sendMsg = require("./sendMsg");

//TODO: USE JWT AUTHENTICATION


router.use("/send-media", sendMedia);
router.use("/send-message", sendMsg);

module.exports = router;
