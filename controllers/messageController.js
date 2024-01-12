const Message = require("../models/message");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display all messages
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

// Display create message form on GET
exports.message_create_get = asyncHandler(async (req, res, next) => {
  res.render("message-form", { user: req.user });
});

exports.message_create_post = asyncHandler(async (req, res, next) => {
  res.render("message-form", { user: req.user });
});

//Display create message form on POST
exports.message_create_post = [
  // Validate and sanitize fields.
  body("title", "name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("text", "Department must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a message object with escaped and trimmed data.
    const message = new Message({
      title: req.body.title,
      text: req.body.text,
      user: req.user,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      res.render("message-form", {
        user: req.user,
        message: message,
        errors: errors.array(),
      });
      // Get all departments for form.
      const allDepartments = await Department.find({}, "name").exec();
    } else {
      // Data from form is valid. Save message.
      await message.save();
      res.redirect("/");
    }
  }),
];
