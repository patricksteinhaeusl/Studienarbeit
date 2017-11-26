'use strict';

const GlobalConfig = require('../configs/index');
const Account = require('../models/account');
const CryptoUtil = require('../utils/crypt');
const ResponseUtil = require('../utils/response');

function login(username, password, callback) {
  if (!(username && password)) {
    return callback(null, ResponseUtil.createNotFoundResponse('Username or Password incorrect'));
  }

  // Injection Code Start - NoSQL Injection, Login bypass
  let hashedPassword = null;

  try {
    hashedPassword = CryptoUtil.hashPwd(password);
  } catch(exception) {
    hashedPassword = password;
  }
  // Injection Code End

  Account.findOne({
    username: username,
    password: hashedPassword,
  }, function(error, resAccount) {
    if(error) return callback(ResponseUtil.createErrorResponse(error));
    if(!resAccount) {
      return callback(null, ResponseUtil.createNotFoundResponse('Username or Password incorrect'));
    } else {
      let {_id, username, firstname, lastname, email} = resAccount;
      let user = {_id, username, firstname, lastname, email};
        CryptoUtil.createToken(user, GlobalConfig.jwt.secret, GlobalConfig.auth.signOptions, (error, token) => {
          if(error) return callback(ResponseUtil.createErrorResponse(error));
          let result = { 'user': user, 'token': token };
          return callback(null, ResponseUtil.createSuccessResponse(result, 'Login successfully'));
      });
    }
  });
}

function register(account, callback) {
  if (!account) {
    return callback(null, ResponseUtil.createNotFoundResponse('No Data'));
  }

  let newAccount = new Account(account);

  newAccount.save(function(error, result) {
    if(error) return callback(ResponseUtil.createErrorResponse(error));
    if(!result) return callback(ResponseUtil.createNotFoundResponse('Registration failed'));
    let {_id, username, firstname, lastname, email} = result;
    let user = {_id, username, firstname, lastname, email};
    CryptoUtil.createToken(user, GlobalConfig.jwt.secret, GlobalConfig.auth.signOptions, (error, token) => {
      if(error) return callback(ResponseUtil.createErrorResponse(error));
      let result = { 'user': user, 'token': token };
      return callback(null, ResponseUtil.createSuccessResponse(result, 'Registration successfully'));
    });
  });
}

module.exports = {
  login,
  register
};