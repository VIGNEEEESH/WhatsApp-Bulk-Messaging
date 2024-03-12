const { Client, NoAuth, MessageMedia } = require("whatsapp-web.js");
const qr = require("qrcode");
const fs = require("fs");
const csv = require("csv-parser");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const cors = require("cors");
const contacts = [];
const messageRoutes = require("./Routes/Message-Routes");
const qrcodeRoutes = require("./Routes/Qrcode-Routes");
const adminRoutes = require("./Routes/Admin-Routes");
const userRoutes = require("./Routes/User-Routes");
const Message = require("./Models/Message");
// const Deploy_all = require("./Deploy_all");
const getRandomDelay = () =>
  Math.floor(Math.random() * (11000 - 5000 + 1)) + 5000;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

import("node-fetch")
  .then((fetchModule) => {})
  .catch((error) => {
    console.error("Error importing node-fetch:", error);
  });
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads/images", express.static(path.join("uploads", "images")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Acess-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.get("/api/bulkmessage/check-login", (req, res) => {
  // Check if the client is ready (logged in)

  res.json({ loggedIn: isLoggedIn });
});

app.use("/api/bulkmessage/message", messageRoutes);
app.use("/api/bulkmessage/qrcode", qrcodeRoutes);
app.use("/api/bulkmessage/admin", adminRoutes);
app.use("/api/bulkmessage/user", userRoutes);
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured" });
});

let counter = { fails: 0, success: 0 };

const client = new Client({
  authStrategy: new NoAuth(),
});

client.initialize();

client.on("ready", () => {
  console.log("Client is ready!");

  isLoggedIn = true;
});
client.on("qr", (qrCode) => {
  qr.toFile("./uploads/qrcode.png", qrCode, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("QR Code saved as ./qrcode.png");
    }
  });
});

client.on("auth_failure", (msg) => {
  console.error("AUTHENTICATION FAILURE", msg);
});

let isLoggedIn = false;

client.on("disconnected", (reason) => {
  console.log("Client was logged out", reason);
  isLoggedIn = false;
  client.initialize();
});
let isDeploying = false;
const deploy_all = async () => {
  if (isDeploying) {
    console.log(
      "Previous deployment is still in progress. Skipping this round."
    );
    return;
  }

  isDeploying = true;
  const counter = { fails: 0, success: 0 };

  try {
    const messages = await Message.find({ sent: false });

    for (const message of messages) {
      const { _id, contacts, text, image, pdf } = message;

      const contactsArray = contacts
        .split(",")
        .map((contact) => contact.trim());

      for (const contact of contactsArray) {
        const final_number =
          contact.length > 10 ? `${contact}@c.us` : `91${contact}@c.us`;

        try {
          const isRegistered = await client.isRegisteredUser(final_number);

          if (isRegistered) {
            let media;

            if (image) {
              const base64Image = fs.readFileSync(image, {
                encoding: "base64",
              });
              media = new MessageMedia("image/png", base64Image);
            }
            if (pdf) {
              console.log(pdf);
              // Read the PDF file
              const pdfBuffer = fs.readFileSync(pdf, {
                encoding: "base64",
              });

              media = new MessageMedia("application/pdf", pdfBuffer);
            }

            try {
              if (media) {
                await client.sendMessage(final_number, media, {
                  caption: text || "",
                });
                await Message.updateOne({ _id }, { $set: { sent: true } });
              } else {
                await client.sendMessage(
                  final_number,
                  text || "Default text message"
                );

                await Message.updateOne({ _id }, { $set: { sent: true } });
              }

              console.log(`${contact} Message Sent`);
              counter.success++;
            } catch (sendError) {
              console.error(
                `${contact} Failed to send message: ${sendError.message}`
              );
              counter.fails++;
            }
            const randomDelay = getRandomDelay();
            await delay(randomDelay);
          } else {
            console.log(`${contact} Failed: Not registered`);
            counter.fails++;
          }
        } catch (error) {
          console.error(`${contact} Failed: ${error.message}`);
          counter.fails++;
        }

        // const randomDelay = Math.floor(
        //   Math.random() * (11000 - 5000 + 1) + 5000
        // );
        // console.log(randomDelay);
        // await new Promise((resolve) => setTimeout(resolve, randomDelay));
      }
    }

    console.log(`Result: ${counter.success} sent, ${counter.fails} failed`);
  } catch (error) {
    console.error("Error deploying messages:", error.message);
  } finally {
    isDeploying = false;
  }
};

setInterval(deploy_all, 10000);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rw3waqy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(app.listen(4444))
  .catch((err) => {
    console.log(err);
  });
module.exports = { deploy_all };
