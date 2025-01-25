const express = require("express");
const { registeruser, authuser } = require("../controller/usercontroler");
const User = require("../models/user");
const { generatetoken } = require("../jwt");

const router = express.Router();

router.post("/signup", registeruser);

router.post("/login", authuser);

module.exports = router;
