const Chat = require("../models/chat");
const User = require("../models/user");

const finduser = async (req, res) => {
  try {
    const search = req.query.search || "";
    const { id: currentuserid } = req.user;
    console.log(search, " ", currentuserid);
    const user = await User.find({
      $and: [
        {
          name: { $regex: ".*" + search + ".*", $options: "i" },
        },
        { _id: { $ne: currentuserid } },
      ],
    })
      .select("-password")
      .select("email");
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(400).json("user not found");
  }
};

const getusers = async (req, res) => {
  try {
    const { id: currentuserid } = req.user;
    const currentchats = await Chat.find({
      users: currentuserid,
    }).sort({ updatedAt: -1 });
    if ((!currentchats || currentchats, this.length === 0))
      return res.status(200).json("no chats");
    const particpnt = currentchats.reduce((ids, chat) => {
      const otherparticpnt = chat.users.filter((id) => id !== currentuserid);
      return [...ids, ...otherparticpnt];
    }, []);
    const otherparticpntids = particpnt.filter(
      (id) => id.toString() !== currentuserid.toString()
    );
    const user = await User.find({ _id: { $in: otherparticpntids } })
      .select("-password")
      .select("-email");
    const users = otherparticpntids.map((id) =>
      user.find((user) => user._id.toString() === id.toString())
    );
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.status(500).json("no users");
  }
};
module.exports = { finduser, getusers };
