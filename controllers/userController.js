const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

// Handle sign up on GET
exports.user_sign_up_get = asyncHandler(async (req, res, next) => {
  res.render("sign-up-form", { title: "Sign up", errors: [] });
});

// Handle sign up on POST.
exports.user_sign_up_post = [
  // Validate and sanitize fields.
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified."),
  body("last_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Last name must be specified."),
  body("username")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Username must be specified."),
  body("password")
    .trim()
    .isLength({ min: 4 })
    .escape()
    .withMessage("Password must be at least 4 characters."),
  body("confirm_password")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("The passwords do not match"),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: req.body.password,
      membership_status: false,
    });
    //console.log(user);
    //console.log(errors);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("sign-up-form", {
        title: "Sign up",
        user: user,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.

      await user.save();
      // TODO ******************
      // Redirect to messages.
      res.redirect("/");
    }
  }),
];

// Handle membership on GET
exports.user_membership_get = asyncHandler(async (req, res, next) => {
  res.render("membership-page", { user: req.user });
});

// Handle membership on POST
exports.user_membership_post = [
  // Validate and sanitize fields.
  body("Passcode")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Enter a passcode"),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    const user = await User.findById(req.user._id).exec();

    if (user === null) {
      res.redirect("/");
    }

    const updateUser = new User({
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      password: user.password,
      membership_status: true,
      _id: req.user._id,
    });

    if (req.body.passcode == "apples" /* process.env.PASSCODE*/) {
      console.log("Match");
      await User.findByIdAndUpdate(req.user._id, updateUser, {});
    }
    res.redirect("/");
  }),
];
