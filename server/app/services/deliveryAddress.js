'use strict';

const Account = require('../models/account');
const DeliveryAddress = require('../models/deliveryAddress');
const resultUtil = require('../utils/resultUtil');

function get(deliveryAddressId, callback) {
  if(!deliveryAddressId) return callback(resultUtil.createNotFoundException());
  DeliveryAddress.findById(deliveryAddressId, function(error, result) {
    if(error) return callback(resultUtil.createErrorException(error));
    if(!result) return callback(resultUtil.createNotFoundException());
    result = { 'deliveryAddress' : result};
    return callback(null, result);
  });
}

function getByAccountId(accountId, callback) {
  if(!accountId) return callback(resultUtil.createNotFoundException());
  DeliveryAddress.find({ 'owner' : accountId }, function(error, result) {
    if(error) return callback(resultUtil.createErrorException(error));
    if(!result) return callback(resultUtil.createNotFoundException());
    result = { 'deliveryAddress' : result};
    return callback(null, result);
  });
}

function update(deliveryAddress, callback) {
  let deliveryAddressObj = new DeliveryAddress(deliveryAddress);
  if(!deliveryAddressObj) return callback(resultUtil.createNotFoundException());
  DeliveryAddress.findByIdAndUpdate(deliveryAddressObj._id, deliveryAddressObj, function(error, result) {
    if(error) return callback(resultUtil.createErrorException(error));
    if(!result) return callback(resultUtil.createNotFoundException());
    result = { 'deliveryAddress' : result};
    return callback(null, result);
  });
}

function insert(deliveryAddress, callback) {
  let deliveryAddressObj = new DeliveryAddress(deliveryAddress);
  if(!deliveryAddressObj) return callback(resultUtil.createNotFoundException());
  deliveryAddressObj.save(function(error, result) {
    if(error) return callback(error);
    if(!result) return callback(resultUtil.createNotFoundException());
    result = { 'deliveryAddress' : result};
    return callback(null, result);
  });
}

function insertByAccount(account, deliveryAddress, callback) {
  let accountObj = new Account(account);
  let deliveryAddressObj = new DeliveryAddress(deliveryAddress);
  if(!deliveryAddressObj || !accountObj) return callback(resultUtil.createNotFoundException());
  Account.findById(accountObj._id, function(error, result) {
    if(error) return callback(error);
    if(!result) return callback(resultUtil.createNotFoundException());
    deliveryAddressObj.owner = result._id;
    deliveryAddressObj.save(function(error, result) {
      if(error) return callback(error);
      if(!result) return callback(resultUtil.createNotFoundException());
      result = { 'deliveryAddress' : result};
      return callback(null, result);
    });
  });
}

function remove(deliveryAddressId, callback) {
  if(!deliveryAddressId) return callback(resultUtil.createNotFoundException());
  DeliveryAddress.findByIdAndRemove(deliveryAddressId, function(error) {
    if(error) return callback(error);
    return callback(null);
  });
}

module.exports = {
  get,
  getByAccountId,
  update,
  insert,
  insertByAccount,
  remove
};