'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cryptoUtil = require('../utils/crypt');

let accountSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstname: { type: String, require: true },
  lastname: { type: String, require: true },
  email: { type: String, require: true }
}, {
  timestamps: {}
});

accountSchema.pre('save', function(callback) {
  let account = this;
  if (!account.isModified('password')) return callback();
  account.password = cryptoUtil.hashPwd(account.password);
  return callback();
});

let Account = mongoose.model('Account', accountSchema);

module.exports = Account;