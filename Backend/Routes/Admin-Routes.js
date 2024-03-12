const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const adminControllers = require("../Controllers/Admin-Controllers");

router.get("/get/all/admins", adminControllers.getAllAdmins);
router.get("/get/admin/byid/:id", adminControllers.getAdminById);
router.post(
  "/create/admin",
  [
    check("email").notEmpty(),
    check("password").notEmpty(),
    check("role").notEmpty(),
  ],
  adminControllers.createAdmin
);
router.post("/login", adminControllers.login);
router.patch("/update/admin/byid/:id", adminControllers.updateAdminById);
router.delete("/delete/admin/byid/:id", adminControllers.deleteAdmin);
module.exports = router;
