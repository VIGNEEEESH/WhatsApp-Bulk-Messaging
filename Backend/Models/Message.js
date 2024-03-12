const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  text: { type: String },
  image: { type: String },
  pdf: { type: String },
  contacts: { type: String, required: true },
  sent: { type: Boolean },
});
module.exports = mongoose.model("Message", messageSchema);
