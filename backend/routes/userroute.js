const express = require("express");
const { jwtmiddleware } = require("../jwt");
const { finduser, getusers } = require("../controller/userhandler");

const router = express.Router();

router.get("/find", jwtmiddleware, finduser);
router.get("/currentuser", jwtmiddleware, getusers);

module.exports = router;
