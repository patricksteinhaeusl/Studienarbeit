'use strict';

const Account = require('../models/account');
const resultUtil = require('../utils/resultUtil');

function get(accountId, callback) {
  if(!accountId) return callback(resultUtil.createNotFoundException());
  Account.findById(accountId, function(error, result) {
    if(error) return callback(resultUtil.createErrorException(error));
    if(!result) return callback(resultUtil.createNotFoundException());
    result = { account : result };
    return callback(null, result);
  });
}

function update(account, callback) {
  let accountObj = new Account(account);
  if(!accountObj) return callback(resultUtil.createNotFoundException());
  Account.findByIdAndUpdate(accountObj._id, accountObj, {new: true}, function(error, result) {
    if(error) return callback(resultUtil.createErrorException(error));
    if(!result) return callback(resultUtil.createNotFoundException());
    result = { account : result};
    callback(null, result);
  });
}

function insert(account, callback) {
  let accountObj = new Account(account);
  if(!accountObj) return callback(resultUtil.createNotFoundException());
  accountObj.save(function(error, result) {
    if(error) return callback(resultUtil.createErrorException(error));
    if(!result) return callback(resultUtil.createNotFoundException());
    result = { account : result};
    callback(null, result);
  });
}

module.exports = {
  get,
  update,
  insert
};