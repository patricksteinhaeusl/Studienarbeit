'use strict';

const config = require('../config');
const Account = require('../models/account');
const cryptoUtil = require('../utils/cryptoUtil');
const resultUtil = require('../utils/resultUtil');

function login(username, password, callback) {
  if (!(username && password)) {
    return callback(null, "No Data");
  }

  Account.findOne({
    username: username
  }, function(error, account) {
    if(error) return callback(error);
    if (!account) {
      return callback(null, "Wrong username or password!");
    } else if (account) {
      if (!account.comparePassword(password)) {
        return callback(null, "Wrong username or password!");
      } else {
        let {_id, username, firstname, lastname, email} = account;
        let user = {_id, username, firstname, lastname, email};
        cryptoUtil.createToken(user, config.jwtSecret, config.AUTH.signOptions, (error, token) => {
          if(error) return callback(resultUtil.createErrorException(error));
          callback(null, { token : token })
        });
      }
    }
  });
}

module.exports = {
  login
};