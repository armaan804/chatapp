const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userschema = mongoose.Schema(
  {
    name: { type: "String", required: true },
    email: { type: "String", required: true, unique: true },
    password: { type: "String", required: true },
    pic: {
      type: "String",
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg%22",
    },
    gender: { type: "String", required: "true", enum: ["male", "female"] },
    isadmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

userschema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(user.password, salt);
    user.password = hashpassword;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
});
userschema.methods.comparepassword = async function (userpassword) {
  try {
    const ismatch = await bcrypt.compare(userpassword, this.password);
    console.log(userpassword);
    console.log(this.password);
    return ismatch;
  } catch (err) {
    throw err;
  }
};

const User = mongoose.model("User", userschema);
module.exports = User;
