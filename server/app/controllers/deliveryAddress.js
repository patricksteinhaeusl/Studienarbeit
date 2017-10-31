'use strict';

const deliveryAddressService = require('../services/deliveryAddress');
const resultUtil = require('../utils/resultUtil');

function get(req, res, callback) {
  let deliveryAddressId = req.params.deliveryAddressId;
  deliveryAddressService.get(deliveryAddressId, (error, result) => {
    if(error) return callback(error);
    res.json(resultUtil.createResult(result));
  });
}

function getByAccountId(req, res, callback) {
  let accountId = req.params.accountId;
  deliveryAddressService.get(accountId, (error, result) => {
    if(error) return callback(error);
    res.json(resultUtil.createResult(result));
  });
}

function update(req, res, callback) {
  let deliveryAddress = req.body.deliveryAddress;
  deliveryAddressService.update(deliveryAddress, (error, result) => {
    if(error) return callback(error);
    res.json(resultUtil.createResult(result));
  });
}

function insert(req, res, callback) {
  let deliveryAddress = req.body.deliveryAddress;
  deliveryAddressService.insert(deliveryAddress, (error, result) => {
    if(error) return callback(error);
    res.json(resultUtil.createResult(result));
  });
}

function remove(req, res, callback) {
  let deliveryAddressId = req.params.deliveryAddressId;
  deliveryAddressService.remove(deliveryAddressId, (error, result) => {
    if(error) return callback(error);
    res.json(resultUtil.createResult(result));
  });
}

module.exports = {
  get,
  getByAccountId,
  update,
  insert,
  remove
};