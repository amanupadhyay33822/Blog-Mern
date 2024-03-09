/* eslint-disable no-undef */
const express = require("express");
const { signUp, login } = require("../controllers/Auth");
const { createPost, getPost } = require("../controllers/Post");

const { resetPasswordtoken, resetPassword } = require("../controllers/ResetPassword");
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/reset-password-token",resetPasswordtoken);
router.post("/reset-password",resetPassword);

router.post("/create", createPost);
router.get("/get", getPost);

module.exports = router;
