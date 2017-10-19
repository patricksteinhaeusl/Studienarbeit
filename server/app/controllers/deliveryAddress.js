'use strict';

const deliveryAddressService = require("../services/deliveryAddress");

function get(req, res) {
  let deliveryAddressId = req.params.deliveryAddressId;
  deliveryAddressService.get(deliveryAddressId, (result) => {
    res.json(result);
  });
}

function getAllByAccountId(req, res) {
  let accountId = req.params.accountId;
  creditCardService.getAllByAccountId(accountId, (result) => {
    res.json(result);
  });
}

function update(req, res) {
  let deliveryAddress = req.body.deliveryAddress;
  deliveryAddressService.update(deliveryAddress, (result) => {
    res.json(result);
  });
}

function insert(req, res) {
  let account = req.body.account;
  let deliveryAddress = req.body.deliveryAddress;
  deliveryAddressService.insert(account, deliveryAddress, (result) => {
    res.json(result);
  });
}

function remove(req, res) {
  let deliveryAddressId = req.params.deliveryAddressId;
  deliveryAddressService.remove(deliveryAddressId, (result) => {
    res.json(result);
  });
}

module.exports = {
  get,
  getAllByAccountId,
  update,
  insert,
  remove
};