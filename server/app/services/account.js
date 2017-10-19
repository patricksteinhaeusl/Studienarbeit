'use strict';

const Account = require('../models/account');
const exceptionUtil = require('../utils/exceptionUtil');

function get(accountId, callback) {
  if(!accountId) return callback(exceptionUtil.createNotFoundException());
  Account.findById(accountId, function(err, result) {
    if(err) return callback(exceptionUtil.createErrorException(err));
    if(!result) return callback(exceptionUtil.createNotFoundException());
    result = { account : result};
    callback(result);
  });
}

function update(account, callback) {
  let accountObj = new Account(account);
  if(!accountObj) return callback(exceptionUtil.createNotFoundException());
  Account.findByIdAndUpdate(accountObj._id, accountObj, {new: true}, function(err, result) {
    if(err) return callback(exceptionUtil.createErrorException(err));
    if(!result) return callback(exceptionUtil.createNotFoundException());
    result = { account : result};
    callback(result);
  });
}

module.exports = {
  get,
  update
};