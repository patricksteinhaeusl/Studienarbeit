'use strict';

const GlobalConfig = require('../configs/index');
const Account = require('../models/account');
const CryptoUtil = require('../utils/crypt');
const ResponseUtil = require('../utils/response');

function login(username, password, callback) {
  if (!(username && password)) {
    return callback(null, "No Data");
  }

  Account.findOne({
    username: username
  }, function(error, resAccount) {
    if(error) return callback(error);
    if (!resAccount || !resAccount.comparePassword(password)) {
      return callback(ResponseUtil.createNotFoundResponse());
    } else {
      let {_id, username, firstname, lastname, email} = resAccount;
      let user = {_id, username, firstname, lastname, email};
        CryptoUtil.createToken(user, GlobalConfig.jwt.secret, GlobalConfig.auth.signOptions, (error, token) => {
        if(error) return callback(ResponseUtil.createErrorResponse(error));
        let result = { 'user': user, 'token': token };
        return callback(null, ResponseUtil.createSuccessResponse(result));
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
    if (error) return callback(ResponseUtil.createErrorResponse(error));
    let {_id, username, firstname, lastname, email} = result;
    let user = {_id, username, firstname, lastname, email};
    CryptoUtil.createToken(user, GlobalConfig.jwt.secret, GlobalConfig.auth.signOptions, (error, token) => {
      if(error) return callback(ResponseUtil.createErrorResponse(error));
      let result = { 'user': user, 'token': token };
      return callback(null, ResponseUtil.createSuccessResponse(result));
    });
  });
}

module.exports = {
  login,
  register
};