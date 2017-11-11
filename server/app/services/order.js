'use strict';

const Order = require('../models/order');
const resultUtil = require('../utils/resultUtil');

function get(orderId, callback) {
  if(!orderId) return callback(resultUtil.createNotFoundException());
  Order.findById(orderId, function(error, result) {
    if(error) return callback(resultUtil.createErrorException(error));
    if(!result) return callback(resultUtil.createNotFoundException());
    result = { 'order' : result };
    return callback(null, result);
  });
}

function getByAccountId(accountId, callback) {
  if(!accountId) return callback(resultUtil.createNotFoundException());
  Order
    .find({ _account: accountId })
    .sort({ 'createdAt': -1})
    .exec(function(error, result) {
      console.log(error);
      console.log(result);
      if (error) return callback(resultUtil.createErrorException(error));
      if (!result) return callback(resultUtil.createNotFoundException());
      result = {'orders': result};
      return callback(null, result);
  });
}

function update(order, callback) {
  let orderObj = new Order(order);
  if(!orderObj) return callback(resultUtil.createNotFoundException());
  Order.findByIdAndUpdate(orderObj._id, orderObj, {new: true}, function(error, result) {
    if(error) return callback(resultUtil.createErrorException(error));
    if(!result) return callback(resultUtil.createNotFoundException());
    result = { 'order' : result };
    return callback(null, result);
  });
}

function insert(order, callback) {
  let orderObj = new Order(order);
  if(!orderObj) return callback(resultUtil.createNotFoundException());
  orderObj.save(function(error, result) {
    if(error) return callback(resultUtil.createErrorException(error));
    if(!result) return callback(resultUtil.createNotFoundException());
    result = { 'order' : result };
    return callback(null, result);
  });
}

function remove(orderId, callback) {
  if(!orderId) return callback(resultUtil.createNotFoundException());
  Order.findByIdAndRemove(orderId, function(error) {
    if(error) return callback(resultUtil.createErrorException(error));
    return callback();
  });
}

module.exports = {
  get,
  getByAccountId,
  update,
  insert,
  remove
};