const Message = require("../models/message");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display all messages
exports.message_list = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({}, "title text user createdAt")
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

// Display message delete form on GET.
exports.message_delete_get = asyncHandler(async (req, res, next) => {
  const message = await Message.findById(req.params.id).exec();

  console.log(message + "*******");
  if (message === null) {
    // No results.
    res.redirect("/");
  }
  res.render("delete", {
    message: message,
  });
});

// Handle Message delete on POST.
exports.message_delete_post = asyncHandler(async (req, res, next) => {
  const message = await Message.findById(req.params.id).exec();
  if (message === null) {
    // No results.
    res.redirect("/");
  }

  await Message.findByIdAndRemove(req.body.messageid);
  res.redirect("/");
});

// TODO add message delete for current user and admin or just admin only for simplicity
// Maybe conditionally add delete button if admin or same user

// TODO tidy things up and make the css look good
// Update readmes on this and inventory app
