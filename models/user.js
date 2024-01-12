const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
  username: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true },
  membership_status: { type: Boolean, required: true },
  isAdmin: { type: Boolean, required: true },
});

// Virtual for user's full name
UserSchema.virtual("name").get(function () {
  //return empty string if name missing
  let fullName = "";
  if (this.first_name && this.last_name) {
    fullName = `${this.last_name}, ${this.first_name}`;
  }
  return fullName;
});

/*
// Virtual for user's URL
UserSchema.virtual("url").get(function () {
  return `/user/${this._id}`;
});
*/

module.exports = mongoose.model("User", UserSchema);
