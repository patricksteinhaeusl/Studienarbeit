'use strict';

const accountService = require("../services/account");

function getAccount(req, res) {
  let accountId = req.params.accountId;
  accountService.getAccount(accountId, (result) => {
    res.json(result);
  });
}

function updateAccount(req, res) {
  let account = req.body.account;
  accountService.updateAccount(account, (result) => {
    res.json(result);
  });
}

module.exports = {
  getAccount,
  updateAccount
};