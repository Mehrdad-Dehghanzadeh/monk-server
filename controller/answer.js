/** @format */

const path = require("path");

const Answer = require("../model/answer");
const { addToFile } = require("../utils/files");
const { conectDB } = require("../utils/db");

const filePath = path.resolve(__dirname, "../data/db.json");

async function createAnswer(req, res, next) {
  const { message, ticketID } = req.body;
  if (message && ticketID) {
    const { answers } = await conectDB();

    const node = new Answer({ message, ticketID }, answers);
    addToFile(node, "answers", filePath)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((error) => {
        next(error);
      });
  } else {
    res.sendStatus(400);
  }
}

async function readAnswer(req, res) {
  const { answers } = await conectDB();
  res.status(200).json(answers);
}

async function readAnswerTicketID(req, res) {
  const { answers } = await conectDB();
  const data = answers.filter((el) => el.ticketID == req.params.ticketID);
  res.status(200).json(data);
}

module.exports = { createAnswer, readAnswer, readAnswerTicketID };
