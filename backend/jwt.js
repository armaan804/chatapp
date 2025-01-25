const jwt = require("jsonwebtoken");
const { Model } = require("mongoose");

const generatetoken = (userid) => {
  return jwt.sign(userid, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const jwtmiddleware = async (req, res, next) => {
  const Authorization = req.headers.authorization;
  if (!Authorization) return res.status(400).json("auth not found");
  const token = Authorization.split(" ")[1];
  // const token = req.cookies.jwt;
  if (!token) return res.status(400).json("token not found");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json("invalid token");
  }
};

module.exports = { generatetoken, jwtmiddleware };
