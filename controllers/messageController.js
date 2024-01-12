const Message = require("../models/message");
const asyncHandler = require("express-async-handler");

/*
//Display list of all messages
exports.message_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Message list");
});
*/

exports.message_list = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({}, "title text user")
    .sort({ timeStamp: 1 })
    .populate("user")
    .exec();

  res.render("index", {
    user: req.user,
    title: "Messages",
    message_list: messages,
  });
});
