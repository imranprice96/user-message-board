var express = require("express");
var router = express.Router();
const messsage_controller = require("../controllers/messageController");
const user_controller = require("../controllers/userController");

/* GET home page. */

/*
router.get("/", function (req, res, next) {
  res.render("index", {
    user: req.user,
  });
});
*/

// Get messages page
router.get("/", messsage_controller.message_list);

// Get sign up page
router.get("/sign-up", user_controller.user_sign_up_get);

// Post sign up page
router.post("/sign-up", user_controller.user_sign_up_post);

// Get membership page
router.get("/membership", user_controller.user_membership_get);

// Post membership page
router.post("/membership", user_controller.user_membership_post);

// Get create message pagge
router.get("/message", messsage_controller.message_create_get);

// Post create message page
router.post("/message", messsage_controller.message_create_post);

// Get delete message page
router.get("/:id/delete", messsage_controller.message_delete_get);

// Post delete
router.post("/:id/delete", messsage_controller.message_delete_post);

module.exports = router;
