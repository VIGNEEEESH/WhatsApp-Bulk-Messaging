const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const qrcodeSchema = new Schema({
  qr: { type: String, required: true },
  time: { type: String, required: true },
});
module.exports = mongoose.model("Qrcode", qrcodeSchema);
