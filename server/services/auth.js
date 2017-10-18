'use strict';

const config = require('../config');
const cryptoUtil = require('../utils/cryptoUtil');
const Account = require('../models/account');

function login(username, password, callback) {
  if (!(username && password)) {
    return callback(null, "No Data");
  }

  Account.findOne({
    username: username
  }, function(err, account) {
    if (err) throw err;
    if (!account) {
      return callback(null, "Wrong username or password!");
    } else if (account) {
      if (!account.comparePassword(password)) {
        return callback(null, "Wrong username or password!");
      } else {
        let {_id, username, firstname, lastname, email} = account;
        let user = {_id, username, firstname, lastname, email};
        cryptoUtil.createToken(user, config.jwtSecret, config.AUTH.signOptions, (err, token) => {
          callback(null, { token : token })
        });
      }
    }
  });
}

module.exports = {
  login
};