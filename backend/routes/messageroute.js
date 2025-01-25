const express = require("express");
const { sendmessage, getmessage } = require("../controller/messagecontroler");
const { jwtmiddleware } = require("../jwt");
const router = express.Router();

router.post("/send/:id", jwtmiddleware, sendmessage);
router.get("/:id", jwtmiddleware, getmessage);

module.exports = router;
