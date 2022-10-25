const express = require("express");
const router = express.Router();
const { createSession } = require("../services/session")


router.post("/", async function  (req, res) {
    if (!req.body ) {
        return res.status(400).json({
          status: "Bad Request",
          message: "req body cannot be empty!",
        });
      }
    else {
      let sender = req.body.sender;
      let receiver = req.body.receiver;
      let message = req.body.message;
      let description = req.body.description; 
      await createSession (sender, description)
      }

});

module.exports = router;