const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const messageController = require("../Controllers/Message-Controllers");
const fileUpload = require("../middleware/file-upload");

router.get("/get/allmessages", messageController.getAllMessages);

router.post(
  "/create/message",
  fileUpload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  [check("contacts").notEmpty()],
  messageController.createMessage
);
router.delete("/delete/message", messageController.deleteMessage);
module.exports = router;
