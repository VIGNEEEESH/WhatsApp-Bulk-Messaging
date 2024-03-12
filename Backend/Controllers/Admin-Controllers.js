const HttpError = require("../Models/http-error");
const { validationResult } = require("express-validator");
const Admin = require("../Models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createAdmin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Invalid inputs passed, please try again",
      errors: errors.array(),
    });
  }
  const { email, password, role } = req.body;
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Something went wrong, please try again", 500);
    return next(error);
  }
  if (existingAdmin) {
    const error = new HttpError("email already exists, please try again", 500);
    return next(error);
  }
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("Something went wrong, please try again", 500);
    return next(error);
  }
  const createdAdmin = new Admin({
    email,
    password: hashedPassword,
    role,
  });
  try {
    await createdAdmin.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong creating admin, please try again",
      500
    );
    return next(error);
  }
  let token;
  try {
    token = jwt.sign(
      {
        userId: createdAdmin.id,
        email: createdAdmin.email,
        role: createdAdmin.role,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Something went wrong, please try again", 500);
    return next(error);
  }
  res.status(201).json({
    userId: createdAdmin.id,
    email: createdAdmin.email,
    role: createdAdmin.role,
    token: token,
  });
};
const getAllAdmins = async (req, res, next) => {
  let admins;
  try {
    admins = await Admin.find({}, "-password");
  } catch (err) {
    const error = new HttpError("Something went wrong, please try again", 500);
    return next(error);
  }
  res.json({ admins: admins });
};
const getAdminById = async (req, res, next) => {
  let admin;
  const id = req.params.id;
  try {
    admin = await Admin.findOne({ _id: id }, "-password");
  } catch (err) {
    const error = new HttpError("Something went wrong, please try again", 500);
    return next(error);
  }
  res.json({ admin: admin });
};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Something went wrong, please try again", 500);
    return next(error);
  }
  if (!existingAdmin) {
    const error = new HttpError("Invalid email, please try again", 401);
    return next(error);
  }
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingAdmin.password);
  } catch (err) {
    const error = new HttpError("Something went wrong, please try again", 500);
    return next(error);
  }
  if (!isValidPassword) {
    const error = new HttpError("Invalid crudentials, please try again", 401);
    return next(error);
  }
  let token;
  try {
    token = jwt.sign(
      {
        userId: existingAdmin.id,
        email: existingAdmin.email,
        role: existingAdmin.role,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Something went wrong, please try again", 500);
    return next(error);
  }
  res.status(200).json({
    userId: existingAdmin.id,
    email: existingAdmin.email,
    role: existingAdmin.role,
    token: token,
  });
};
const updateAdminById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid inputs passed, please try again", 422);
    return next(error);
  }
  const id = req.params.id;

  const { role, password } = req.body;
  let admin;
  try {
    admin = await Admin.findOne({ _id: id });
  } catch (err) {
    const error = new HttpError("Something went wrong, please try again", 500);
    return next(error);
  }
  if (!admin) {
    const error = new HttpError("No admin found, please try again", 500);
    return next(error);
  }
  let hashedPassword;
  let updatedPassword;
  if (password == null) {
    updatedPassword = admin.password;
  } else {
    try {
      hashedPassword = await bcrypt.hash(password, 12);
      updatedPassword = hashedPassword;
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, please try again",
        500
      );
      return next(error);
    }
  }

  (admin.password = updatedPassword), (admin.role = role);
  try {
    await admin.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Something went wrong, please try again", 500);
    return next(error);
  }
  try {
    token = jwt.sign(
      { userId: admin.id, email: admin.email, role: admin.role },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Something went wrong, please try again", 500);
    return next(error);
  }
  res.status(201).json({
    userId: admin.id,
    email: admin.email,
    role: admin.role,
    token: token,
  });
};
const deleteAdmin = async (req, res, next) => {
  const id = req.params.id;
  let admin;
  try {
    admin = await Admin.findOne({ _id: id });
    if (!admin) {
      const error = new HttpError("no admin found, please try again", 500);
      return next(error);
    }
    await admin.deleteOne();
    res.status(200).json({ message: "Admin successfully deleted" });
  } catch (err) {
    const error = new HttpError("Something went wrong, please try again", 500);
    return next(error);
  }
};
exports.createAdmin = createAdmin;
exports.getAdminById = getAdminById;
exports.getAllAdmins = getAllAdmins;
exports.login = login;
exports.updateAdminById = updateAdminById;
exports.deleteAdmin = deleteAdmin;
