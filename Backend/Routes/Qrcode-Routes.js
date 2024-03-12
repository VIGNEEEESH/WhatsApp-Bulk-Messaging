const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/get/qrcode", (req, res) => {
  // Assuming the qrcode.png file is stored in the 'uploads' directory
  const imagePath = path.join(__dirname, "..", "uploads", "qrcode.png");

  // Send the image as a response
  res.sendFile(imagePath);
});

module.exports = router;
