'use strict';

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config');

function hashPwd(password) {
  return crypto.createHmac(config.CRYPT.hash, config.CRYPT.secret)
    .update(password)
    .digest('hex');
}

function createToken(user, secret, options, callback) {
  jwt.sign(user, secret, options, (err, token) => callback(err, token));
}

module.exports = {
  hashPwd,
  createToken
};
