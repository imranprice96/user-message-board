const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Use mongoose timestamps
const MessageSchema = new Schema(
  {
    title: { type: String, required: true, maxLength: 100 },
    text: { type: String, required: true, maxLength: 1000 },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Virtual for message URL
MessageSchema.virtual("url").get(function () {
  return `/message/${this._id}`;
});

module.exports = mongoose.Schema("Message", MessageSchema);
