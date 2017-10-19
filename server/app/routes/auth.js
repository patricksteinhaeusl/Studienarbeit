'use strict';

const express = require('express');
const router = express.Router();

const authController = require("../controllers/auth");

router.get('/', function(req, res) {
  res.send("<form action=\"/auth/login\" method='post'>\n" +
    "  <div class=\"container\">\n" +
    "    <label><b>Username</b></label>\n" +
    "    <input type=\"text\" placeholder=\"Enter Username\" name=\"username\" value='Rhoda.Morissette54' required>\n" +
    "\n" +
    "    <label><b>Password</b></label>\n" +
    "    <input type=\"password\" placeholder=\"Enter Password\" name=\"password\" value='gFeecYsEmMVEeq2' required>\n" +
    "\n" +
    "    <button type=\"submit\">Login</button>\n" +
    "  </div>\n" +
    "</form>")
});

router.post('/login', authController.login);

module.exports = router;
