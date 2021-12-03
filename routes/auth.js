/** @format */
const express = require("express");
const { login, logout, checkToken } = require("../controller/auth");

const router = express.Router();

router.post("/login", login);

router.post("/logout", checkToken, logout);

module.exports = router;
