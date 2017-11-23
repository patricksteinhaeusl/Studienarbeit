'use strict';

let LogUtil = require('../utils/log');
let Account = require('../models/account');
let CreditCard = require('../models/creditCard').CreditCard;
let DeliveryAddress = require('../models/deliveryAddress').DeliveryAddress;

let data = {
  drop: function () {
      Account.remove({}, function(err) {
      if(err) return LogUtil.writeError(err);
      return LogUtil.writeInfo('Account removed');
    });
  },
  create: function() {
    let account0 = new Account({
        _id: '59e7ffc364b7f1faf7a3348e',
        username: 'customer0',
        password: '234234',
        firstname: 'Hans',
        lastname: 'Muster',
        email: 'customer0@gmail.com'
    })
    .save(function(err) {
      if(err) return LogUtil.writeError(err);
      return LogUtil.writeInfo('Account saved');
    });

    let creditCard0 = new CreditCard({
      number: '0000-0000-0000-0000',
      type: 'MasterCard',
      _account: account0._id
    })
    .save(function(err) {
      if(err) return LogUtil.writeError(err);
      return LogUtil.writeInfo('CreditCard saved');
    });

    let deliveryAddress0 = new DeliveryAddress({
      street: 'Bahnhofstrasse 33',
      zip:  234324,
      city: 'Triesen',
      country: 'Liechtenstein',
      _account: account0._id
    })
    .save(function(err) {
      if(err) return LogUtil.writeError(err);
      return LogUtil.writeInfo('DeliveryAddress saved');
    });

    let account1 = new Account({
        _id: '59e7ffc364b7f1faf7a3348f',
        username: 'customer1',
        password: '234234',
        firstname: 'Hans',
        lastname: 'Muster',
        email: 'customer1@gmail.com'
    })
    .save(function(err) {
        if(err) return LogUtil.writeError(err);
        return LogUtil.writeInfo('Account saved');
    });

    let creditCard1 = new CreditCard({
      number: '1111-1111-1111-1111',
      type: 'Visa',
      _account: account1._id
    })
    .save(function(err) {
      if(err) return LogUtil.writeError(err);
      return LogUtil.writeInfo('CreditCard saved');
    });

    let deliveryAddress1 = new DeliveryAddress({
      street: 'Bahnhofstrasse 33',
      zip:  234324,
      city: 'Triesen',
      country: 'Liechtenstein',
      _account: account1._id
    })
    .save(function(err) {
      if(err) return LogUtil.writeError(err);
      return LogUtil.writeInfo('DeliveryAddress saved');
    });
  }
};

module.exports = data;