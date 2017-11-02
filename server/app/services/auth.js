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
  }, function(error, resAccount) {
    if(error) return callback(error);
    if (!resAccount || !resAccount.comparePassword(password)) {
      return callback(resultUtil.createNotFoundException());
    } else {
      let {_id, username, firstname, lastname, email} = resAccount;
      let user = {_id, username, firstname, lastname, email};
      cryptoUtil.createToken(user, config.jwtSecret, config.AUTH.signOptions, (error, token) => {
        if(error) return callback(resultUtil.createErrorException(error));
        return callback(null, { 'user': user, 'token': token });
      });
    }
  });
}

function register(account, callback) {
  if (!account) {
    return callback(null, "No Data");
  }

  let newAccount = new Account(account);

  newAccount.save(function(error, result) {
    if (error) return callback(resultUtil.createErrorException(error));
    let {_id, username, firstname, lastname, email} = result;
    let user = {_id, username, firstname, lastname, email};
    cryptoUtil.createToken(user, config.jwtSecret, config.AUTH.signOptions, (error, token) => {
      if(error) return callback(resultUtil.createErrorException(error));
      return callback(null, { 'user': user, 'token': token });
    });
  });
}

module.exports = {
  login,
  register
};