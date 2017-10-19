'use strict';

const accountService = require("../services/account");

function get(req, res) {
  let accountId = req.params.accountId;
  accountService.get(accountId, (result) => {
    res.json(result);
  });
}

function update(req, res) {
  let account = req.body.account;
  accountService.update(account, (result) => {
    res.json(result);
  });
}

module.exports = {
  get,
  update
};