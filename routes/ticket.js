/** @format */

const express = require("express");
const {
  readNode,
  createNode,
  removeNode,
  readItem,
  updateNode,
} = require("../controller/ticket");

const router = express.Router();

router.get("/", readNode);

router.get("/:id", readItem);

router.post("/", createNode);

router.put("/:id", updateNode);

router.delete("/:id", removeNode);

module.exports = router;
