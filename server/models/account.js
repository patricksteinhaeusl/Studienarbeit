'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let cryptoUtil = require('../utils/cryptoUtil');

let accountSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, require: true },
  lastname: { type: String, require: true },
  email: { type: String, require: true },
  created_at: { type: Date, require: true },
  udpated_at: { type: Date, require: true }
});

accountSchema.methods.comparePassword = function(password) {
  return cryptoUtil.hashPwd(password) === this.password;
};

let Account = mongoose.model('Account', accountSchema);

module.exports = Account;