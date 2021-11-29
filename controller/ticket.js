/** @format */
const fs = require("fs");
const path = require("path");

const { conectDB } = require("../utils/db");
const { addToFile, validateItem, removeItem } = require("../utils/files");
const { Ticket } = require("../model/ticket");

const filePath = path.resolve(__dirname, "../data/db.json");

async function readNode(req, res) {
  const { tickets } = await conectDB();
  res.status(200).json(tickets);
}

async function createNode(req, res, next) {
  if (validateItem(req.body)) {
    const { tickets } = await conectDB();
    const node = new Ticket(req.body, tickets);
    addToFile(node, "tickets", filePath)
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

async function removeNode(req, res, next) {
  try {
    const data = await conectDB();
    const newTickets = removeItem(data.tickets, req.params.id);
    data.tickets = newTickets;
    await fs.writeFileSync(filePath, JSON.stringify(data), "utf-8");
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

async function readItem(req, res) {
  const { tickets } = await conectDB();
  const item = tickets.find((item) => item.id == req.params.id);

  res.status(200).json(item);
}

async function updateNode(req, res, next) {
  if (
    validateItem(req.body) &&
    ["closed", "pending", "answered"].includes(req.body.status)
  ) {
    try {
      const data = await conectDB();
      const item = data.tickets.find((item) => item.id == req.params.id);
      data.tickets[data.tickets.indexOf(item)] = { ...item, ...req.body };
      await fs.writeFileSync(filePath, JSON.stringify(data), "utf-8");

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  } else {
    res.sendStatus(400);
  }
}

module.exports = { readNode, createNode, removeNode, readItem, updateNode };
