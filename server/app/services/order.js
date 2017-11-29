'use strict';

const Order = require('../models/order');
const ResponseUtil = require('../utils/response');

function get(orderId, callback) {
  if(!orderId) return callback(ResponseUtil.createNotFoundResponse());
  Order.findById(orderId, function(error, result) {
    if(error) return callback(ResponseUtil.createErrorResponse(error));
    if(!result) return callback(ResponseUtil.createNotFoundResponse());
    result = { 'order' : result };
    return callback(null, ResponseUtil.createSuccessResponse(result));
  });
}

function getByAccountId(accountId, callback) {
  if(!accountId) return callback(ResponseUtil.createNotFoundResponse());
  Order
    .find({ _account: accountId })
    .sort({ 'createdAt': -1})
    .exec(function(error, result) {
      if(error) return callback(ResponseUtil.createErrorResponse(error));
      if(!result) return callback(ResponseUtil.createNotFoundResponse());
      result = { 'orders' : result };
      return callback(null, ResponseUtil.createSuccessResponse(result));
  });
}

function update(order, callback) {
  let orderObj = new Order(order);
  if(!orderObj) return callback(ResponseUtil.createNotFoundResponse());
  Order.findByIdAndUpdate(orderObj._id, orderObj, {new: true}, function(error, result) {
    if(error) return callback(ResponseUtil.createErrorResponse(error));
    if(!result) return callback(ResponseUtil.createNotFoundResponse());
    result = { 'order' : result };
    return callback(null, ResponseUtil.createSuccessResponse(result));
  });
}

function insert(order, callback) {
  let orderObj = new Order(order);
  if(!orderObj) return callback(ResponseUtil.createNotFoundResponse());
  orderObj.save(function(error, result) {
    if(error) return callback(ResponseUtil.createErrorResponse(error));
    if(!result) return callback(ResponseUtil.createNotFoundResponse());
    result = { 'order' : result };
    return callback(null, ResponseUtil.createSuccessResponse(result));
  });
}

function create(callback) {
  let orderObj = new Order();
  let result = { order: orderObj };
  return callback(null, ResponseUtil.createSuccessResponse(result));
}

function remove(orderId, callback) {
  if(!orderId) return callback(ResponseUtil.createNotFoundResponse());
  Order.findByIdAndRemove(orderId, function(error) {
    if(error) return callback(ResponseUtil.createErrorResponse(error));
    return callback(null, ResponseUtil.createSuccessResponse(result));
  });
}

module.exports = {
  get,
  getByAccountId,
  update,
  insert,
  create,
  remove
};