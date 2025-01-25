const mongoose = require("mongoose");
const mongourl = process.env.MONGO_URI;
mongoose.connect(mongourl, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("connected", () => {
  console.log("connected to mongodb server");
});
db.on("error", (err) => {
  console.log("connected to mongodb server");
});
db.on("disconnected", () => {
  console.log("disconnected to mongodb server");
});

module.exports = db;
