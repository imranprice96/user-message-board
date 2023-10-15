var express = require("express");
var router = express.Router();
const messsage_controller = require("../controllers/messageController");
const user_controller = require("../controllers/userController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { user: req.user });
});

// Get messages page
router.get("/messages", messsage_controller.message_list);

// Get sign up page
router.get("/sign-up", user_controller.user_sign_up_get);

// Post sign up page
router.post("/sign-up", user_controller.user_sign_up_post);

module.exports = router;
