'use strict';

const Account = require('../models/account');
const Creditcard = require('../models/creaditcard');

function dropData(callback) {
  Account.remove({}, function(err) {
    if(err) return console.error(err);
    console.log('Collection Account removed');
  });

  Creditcard.remove({}, function(err) {
    if(err) return console.error(err);
    console.log('Collection Creditcard removed');
    callback();
  });
}

function createData() {

  let account = new Account({
    username: 'customer1',
    password: '234234',
    firstname: 'Hans',
    lastname: 'Muster',
    email: 'hans.muster@gmail.com'
  });

  account.save(function(err, account) {
    if (err) return console.error(err);

    let creditcard = new Creditcard({
      number: '234-234234-23423-234',
      owner: account._id
    });

    creditcard.save(function (err) {
      if (err) return console.error(err);
      console.log("Account successfully created!");
    });
  });
}

module.exports = {
  dropData,
  createData,
};