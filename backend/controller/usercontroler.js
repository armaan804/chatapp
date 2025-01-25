const User = require("../models/user");
const { generatetoken } = require("../jwt");
const registeruser = async (req, res) => {
  try {
    const data = req.body;
    const { name, email, password, gender, pic } = data;
    if (!name || !password || !email) {
      return res
        .status(400)
        .send({ success: false, message: "Please enter all field" });
    }
    const emailfound = await User.findOne({ email: email });
    if (emailfound) {
      return res
        .status(400)
        .send({ success: false, message: "Email is already register" });
    }
    let boy = true;
    if (gender === "female") {
      boy = false;
    }
    const profilepic =
      pic || `https://avatar.iran.liara.run/public/${boy ? "boy" : "girl"}`;
    const senddata = { name, email, password, gender, pic: profilepic };
    const user = new User(senddata);
    const respose = await user.save();
    console.log("user id  ", user._id);
    const payload = {
      id: user._id,
    };
    const token = generatetoken(payload);
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 300000),
      httpOnly: true,
    });
    res.status(200).send({
      token,
      success: true,
      message: "succesfully sign up ",
      _id: respose._id,
      name: respose.name,
      pic: respose.pic,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "server error" });
  }
};

const authuser = async (req, res) => {
  try {
    const data = req.body;
    const isfound = await User.findOne({ email: data.email });
    if (!isfound) {
      return res
        .status(400)
        .send({ success: false, message: "user not found" });
    }
    if (!data || !(await isfound.comparepassword(data.password))) {
      return res
        .status(400)
        .send({ success: false, message: "invalid password" });
    }

    const payload = { id: isfound._id };
    const token = generatetoken(payload);
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 300000),
      httpOnly: true,
    });
    console.log(token);
    res.status(200).send({
      token,
      success: true,
      message: "Succesfully login",
      _id: isfound._id,
      name: isfound.name,
      pic: isfound.pic,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "server error" });
  }
};

module.exports = { registeruser, authuser };
