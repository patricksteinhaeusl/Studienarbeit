'use strict';

const authService = require("../services/auth");

function login(req, res) {
  let {username, password} = req.body;
  authService.login(username, password, (err, result) => {
    res.json(result);
  });
}

module.exports = {
  login
};