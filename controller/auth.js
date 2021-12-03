/** @format */
const { conectDB } = require("../utils/db");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  const { users } = await conectDB();
  const { username, password } = req.body;
  const user = users.find(
    (item) => item.username == username && item.password == password
  );

  if (!!user) {
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12,
        data: {
          username: user.username,
        },
      },
      process.env.JWT_KEY,
      { algorithm: "HS384" }
    );

    res.status(200).json({ accessToken: token });
  } else {
    res.sendStatus(401);
  }
}

function logout(req, res) {
  res.sendStatus(200);
}

async function checkToken(req, res, next) {
  const { users } = await conectDB();
  const { authorization } = req.headers;
  const token = authorization.split("Bearer ")[1];
  const { data } = jwt.verify(token, process.env.JWT_KEY);

  const user = users.find((item) => item.username == data.username);

  if (!!user) {
    next();
  } else {
    res.sendStatus(401);
  }
}

module.exports = {
  login,
  logout,
  checkToken,
};
