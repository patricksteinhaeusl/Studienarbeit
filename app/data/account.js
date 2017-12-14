'use strict';

const LogUtil = require('../utils/log');
const Account = require('../models/account');
const CreditCard = require('../models/creditCard').CreditCard;
const DeliveryAddress = require('../models/deliveryAddress').DeliveryAddress;

let data = {
  drop: function(callback) {
    Account.remove({}, function(err) {
      if(err) LogUtil.writeError(err);
      LogUtil.writeInfo('Account removed');
      CreditCard.remove({}, function(err) {
        if(err) LogUtil.writeError(err);
        LogUtil.writeInfo('CreditCard removed');
        DeliveryAddress.remove({}, function(err) {
          if(err) LogUtil.writeError(err);
          LogUtil.writeInfo('DeliveryAddress removed');
          return callback();
        });
      });
    });
  },
  create: function(callback) {

    // http://de.fakenamegenerator.com/gen-random-gr-sz.php

    let account0 = new Account({
      _id: '59e7ffc364b7f1faf7a3348e',
      username: 'customer0',
      password: 'hacker0',
      firstname: 'Juliane',
      lastname: 'Schulze',
      email: 'juliane.schulze@gmail.com'
    })
    .save(function(err, account0) {
      if(err) LogUtil.writeError(err);
      LogUtil.writeInfo('Account saved');

      let creditCard0 = new CreditCard({
        number: '5404000000000001',
        type: 'Mastercard',
        _account: account0._id
      })
      .save(function(err) {
        if(err) LogUtil.writeError(err);
        LogUtil.writeInfo('CreditCard saved');

        let deliveryAddress0 = new DeliveryAddress({
          street: 'Im Sandbüel 93',
          zip:  1700,
          city: 'Fribourg',
          country: 'Schweiz',
          _account: account0._id
        })
        .save(function(err) {
          if(err) LogUtil.writeError(err);
          LogUtil.writeInfo('DeliveryAddress saved');

          let account1 = new Account({
            _id: '59e7ffc364b7f1faf7a3348f',
            username: 'customer1',
            password: 'hacker1',
            firstname: 'Peter',
            lastname: 'Holzmann',
            email: 'peter.holzmann@gmail.com'
          })
          .save(function(err, account1) {
            if(err) LogUtil.writeError(err);
            LogUtil.writeInfo('Account saved');

            let creditCard1 = new CreditCard({
              number: '4900000000000086',
              type: 'Visa',
              _account: account1._id
            })
            .save(function(err) {
              if(err) LogUtil.writeError(err);
              LogUtil.writeInfo('CreditCard saved');

              let deliveryAddress1 = new DeliveryAddress({
                street: 'Sonnenbergstr 114',
                zip:  1897,
                city: 'Bouveret',
                country: 'Schweiz',
                _account: account1._id
              })
                .save(function(err) {
                if(err) LogUtil.writeError(err);
                LogUtil.writeInfo('DeliveryAddress saved');
                return callback();
              });
            });
          });
        });
      });
    });
  }
};

module.exports = data;