'use strict';

const Account = require('../models/account');
const DeliveryAddress = require('../models/deliveryAddress');
const exceptionUtil = require('../utils/exceptionUtil');

function get(deliveryAddressId, callback) {
  if(!deliveryAddressId) return callback(exceptionUtil.createNotFoundException());
  DeliveryAddress.findById(deliveryAddressId, function(err, result) {
    if(err) return callback(exceptionUtil.createErrorException(err));
    if(!result) return callback(exceptionUtil.createNotFoundException());
    result = { deliveryAddress : result};
    callback(result);
  });
}

function getAllByAccountId(accountId, callback) {
  if(!accountId) return callback(exceptionUtil.createNotFoundException());
  DeliveryAddress.find({ 'owner' : accountId }, function(err, result) {
    if(err) return callback(exceptionUtil.createErrorException(err));
    if(!result) return callback(exceptionUtil.createNotFoundException());
    result = { deliveryAddress : result};
    callback(result);
  });
}

function update(deliveryAddress, callback) {
  let deliveryAddressObj = new DeliveryAddress(deliveryAddress);
  if(!deliveryAddressObj) return callback(exceptionUtil.createNotFoundException());
  DeliveryAddress.findByIdAndUpdate(deliveryAddressObj._id, deliveryAddressObj, function(err, result) {
    if(err) return callback(exceptionUtil.createErrorException(err));
    if(!result) return callback(exceptionUtil.createNotFoundException());
    result = { deliveryAddress : result};
    callback(result);
  });
}

function insert(account, deliveryAddress, callback) {
  let accountObj = new Account(account);
  let deliveryAddressObj = new DeliveryAddress(deliveryAddress);
  if(!deliveryAddressObj || !accountObj) return callback(exceptionUtil.createNotFoundException());
  Account.findById(accountObj._id, function(err, result) {
    if(err) return callback(exceptionUtil.createErrorException(err));
    if(!result) return callback(exceptionUtil.createNotFoundException());
    deliveryAddressObj.owner = result._id;
    deliveryAddressObj.save(function(err, result) {
      if(err) return callback(exceptionUtil.createErrorException(err));
      if(!result) return callback(exceptionUtil.createNotFoundException());
      result = { deliveryAddress : result};
      callback(result);
    });
  });
}

function remove(deliveryAddressId, callback) {
  if(!deliveryAddressId) return callback(exceptionUtil.createNotFoundException());
  DeliveryAddress.findByIdAndRemove(deliveryAddressId, function(err) {
    if(err) return callback(exceptionUtil.createErrorException(err));
    callback();
  });
}

module.exports = {
  get,
  getAllByAccountId,
  update,
  insert,
  remove
};