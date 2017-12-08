'use strict';

const GlobalConfig = require('../configs/index');
const Account = require('../models/account');
const CryptoUtil = require('../utils/crypt');
const ResponseUtil = require('../utils/response');

function get(accountId, callback) {
  if(!accountId) return callback(ResponseUtil.createNotFoundResponse());
  Account.findById(accountId, function(error, result) {
    if(error) return callback(ResponseUtil.createErrorResponse(error));
    if(!result) return callback(ResponseUtil.createNotFoundResponse());
    result = { 'account' : result };
    return callback(null, ResponseUtil.createSuccessResponse(result));
  });
}

function update(account, callback) {
  let accountObj = new Account(account);
  if(!accountObj) return callback(ResponseUtil.createNotFoundResponse());
  Account.findByIdAndUpdate(accountObj._id, accountObj, {new: true}, function(error, result) {
    if(error) return callback(ResponseUtil.createErrorResponse(error));
    if(!result) return callback(ResponseUtil.createNotFoundResponse());
    let {_id, username, firstname, lastname, email} = result;
    let user = {_id, username, firstname, lastname, email};
      CryptoUtil.createToken(user, GlobalConfig.jwt.secret, GlobalConfig.auth.signOptions, (error, token) => {
      if(error) return callback(ResponseUtil.createErrorResponse(error));
      result = { 'user': user, 'token': token };
      return callback(null, ResponseUtil.createSuccessResponse(result));
    });
  });
}

module.exports = {
  get,
  update
};