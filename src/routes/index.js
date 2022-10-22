const express = require("express");
const router = express.Router();
const sendMedia = require("./sendMedia");
const sendMsg = require("./sendMsg");

//TODO: USE JWT AUTHENTICATION


router.use("/sendmedia", sendMedia);
router.use("/sendmsg", sendMsg);

module.exports = router;
