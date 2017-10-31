'use strict';

const orderService = require('../services/order');
const resultUtil = require('../utils/resultUtil');

function get(req, res, callback) {
  let orderId = req.params.orderId;
  orderService.get(orderId, (error, result) => {
    if(error) return callback(error);
    res.json(resultUtil.createResult(result));
  });
}

function update(req, res, callback) {
  let order = req.body.order;
  orderService.update(order, (error, result) => {
    if(error) return callback(error);
    res.json(resultUtil.createResult(result));
  });
}

function insert(req, res, callback) {
  let order = req.body.order;
  orderService.insert(order, (error, result) => {
    if(error) return callback(error);
    res.json(resultUtil.createResult(result));
  });
}

function remove(req, res, callback) {
  let orderId = req.params.orderId;
  orderService.insert(orderId, (error, result) => {
    if(error) return callback(error);
    res.json(resultUtil.createResult(result));
  });
}

module.exports = {
  get,
  update,
  insert,
  remove
};