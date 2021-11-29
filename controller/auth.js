/** @format */
const { conectDB } = require("../utils/db");

async function readNode(req, res) {
  const { users } = await conectDB();
  const { username, password } = req.body;
  const user = users.find(
    (item) => item.username == username && item.password == password
  );

  if (!!user) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
}

module.exports = {
  readNode,
};
