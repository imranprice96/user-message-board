const Message = require("../models/message");
const asyncHandler = require("express-async-handler");

//Display list of all messages
exports.message_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Message list");
});
