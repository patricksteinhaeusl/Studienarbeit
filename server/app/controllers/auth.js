'use strict';

const AuthService = require('../services/auth');

function login(req, res) {
  // Injection Code Start - NoSQL Injection, Login bypass
  let username = null;
  let password = null;

  try {
    username = JSON.parse(req.body.username);
    password = JSON.parse(req.body.password);
  } catch(exception) {
    username = req.body.username;
    password = req.body.password;
  }
  // Injection Code End

  AuthService.login(username, password, (error, result) => {
    if(error) return res.json(error);
    res.json(result);
  });
}

function register(req, res) {
  let account = req.body;
  AuthService.register(account, (error, result) => {
    if(error) return res.json(error);
    res.json(result);
  });
}

module.exports = {
  login,
  register
};