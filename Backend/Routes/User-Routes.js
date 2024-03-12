const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const userControllers = require("../Controllers/User-Controllers");

router.get("/get/all/users", userControllers.getAllUsers);
router.get("/get/user/byid/:id", userControllers.getUserById);
router.post(
  "/create/user",
  [
    check("email").notEmpty(),
    check("password").notEmpty(),
    check("role").notEmpty(),
  ],
  userControllers.createUser
);
router.post("/login", userControllers.login);
router.patch("/update/user/byid/:id", userControllers.updateUserById);
router.delete("/delete/user/byid/:id", userControllers.deleteUser);
module.exports = router;
