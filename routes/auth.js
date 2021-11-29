/** @format */
const express = require("express");
const { readNode } = require("../controller/auth");

const router = express.Router();

router.post("/login", readNode);

module.exports = router;
