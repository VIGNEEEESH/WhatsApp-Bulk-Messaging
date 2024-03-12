const HttpError = require("../Models/http-error");
const { validationResult } = require("express-validator");
const Message = require("../Models/Message");
const fs = require("fs");

// const Deploy_all = require("../Deploy_all");
const createMessage = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Invalid inputs passsed, please try again",
      errors: errors.array(),
    });
  }
  const { text, contacts, sent } = req.body;
  const createdMessageData = {
    contacts,
    sent: false,
  };

  if (text && text.trim() !== "") {
    createdMessageData.text = text.trim();
  }

  // if (req.file && req.file.path) {
  //   createdMessageData.image = req.file.path;
  // }

  let image = req.files["image"] ? req.files["image"][0].path : null;

  let pdf = req.files["pdf"] ? req.files["pdf"][0].path : null;
  if (image) {
    createdMessageData.image = image;
  } else if (pdf) {
    createdMessageData.pdf = pdf;
  }

  const createdMessage = new Message(createdMessageData);

  try {
    await createdMessage.save();
    // await Deploy_all();
    res.status(201).json({
      message: "Message created successfully",
      sent: createdMessage.sent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getAllMessages = async (req, res, next) => {
  let messages;
  try {
    messages = await Message.find({});
  } catch (err) {
    const error = new HttpError("Something went wrong, please try again", 500);
    return next(error);
  }
  res.json({ messages: messages });
};
const deleteMessage = async () => {
  let messages;

  try {
    messages = await Message.find({ sent: true });
  } catch (err) {
    console.error("Error finding messages:", err.message);
    throw new Error("Could not find messages");
  }

  if (!messages || messages.length === 0) {
    console.error("Messages not found");
    throw new Error("Messages not found");
  }

  const imagePaths = messages.map((msg) => msg.image);

  try {
    await Promise.all(
      messages.map(async (msg) => {
        // Use deleteOne or deleteMany depending on your needs
        await Message.deleteOne({ _id: msg._id });
      })
    );
  } catch (err) {
    console.error("Error deleting messages:", err.message);
    throw new Error("Could not delete messages");
  }

  try {
    await Promise.all(
      imagePaths.map(async (imagePath) => {
        await fs.promises.unlink(imagePath);
      })
    );
  } catch (err) {
    console.error("Error deleting image files:", err.message);
    throw new Error("Could not delete image files");
  }

  console.log("Messages and image files deleted successfully");
};

const cron = require("node-cron");

// Schedule the task to run every day at 3 AM
cron.schedule("0 3 * * *", async () => {
  try {
    // Call your deleteMessage function or the logic you want to execute
    await deleteMessage();
    console.log("Task executed successfully.");
  } catch (error) {
    console.error("Error executing task:", error.message);
  }
});

exports.createMessage = createMessage;
exports.getAllMessages = getAllMessages;
exports.deleteMessage = deleteMessage;
