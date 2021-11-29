/** @format */

const express = require("express");
const {
  createAnswer,
  readAnswer,
  readAnswerTicketID,
} = require("../controller/answer");
const router = express.Router();

router.get("/", readAnswer);

router.get("/:ticketID", readAnswerTicketID);

router.post("/", createAnswer);

module.exports = router;
