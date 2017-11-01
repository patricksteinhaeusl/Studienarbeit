'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cryptoUtil = require('../utils/cryptoUtil');

let accountSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstname: { type: String, require: true },
  lastname: { type: String, require: true },
  email: { type: String, require: true }
}, {
  timestamps: {}
});

accountSchema.methods.comparePassword = function(password) {
  console.log(cryptoUtil.hashPwd(password));
  return cryptoUtil.hashPwd(password) === this.password;
};

let Account = mongoose.model('Account', accountSchema);

module.exports = Account;