'use strict';

const config = require('../config');
const Account = require('../models/account');
const cryptoUtil = require('../utils/cryptoUtil');
const resultUtil = require('../utils/resultUtil');

function get(accountId, callback) {
  if(!accountId) return callback(resultUtil.createNotFoundException());
  Account.findById(accountId, function(error, result) {
    if(error) return callback(resultUtil.createErrorException(error));
    if(!result) return callback(resultUtil.createNotFoundException());
    result = { 'account' : result };
    return callback(null, result);
  });
}

function update(account, callback) {
  let accountObj = new Account(account);
  if(!accountObj) return callback(resultUtil.createNotFoundException());
  Account.findByIdAndUpdate(accountObj._id, accountObj, {new: true}, function(error, result) {
    if(error) return callback(resultUtil.createErrorException(error));
    if(!result) return callback(resultUtil.createNotFoundException());
    let {_id, username, firstname, lastname, email} = result;
    let user = {_id, username, firstname, lastname, email};
    cryptoUtil.createToken(user, config.jwtSecret, config.AUTH.signOptions, (error, token) => {
      if(error) return callback(resultUtil.createErrorException(error));
      return callback(null, { 'user': user, 'token': token });
    });
  });
}

function insert(account, callback) {
  let accountObj = new Account(account);
  if(!accountObj) return callback(resultUtil.createNotFoundException());
  accountObj.save(function(error, result) {
    if(error) return callback(resultUtil.createErrorException(error));
    if(!result) return callback(resultUtil.createNotFoundException());
    result = { 'account' : result};
    return callback(null, result);
  });
}

module.exports = {
  get,
  update,
  insert
};