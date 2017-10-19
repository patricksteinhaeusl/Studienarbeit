'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let creditCardSchema = new Schema({
  number: { type: String, required: true, unique: true },
  owner: { type: Schema.Types.ObjectId, ref: 'Account'}
}, {
  timestamps: {}
});

let CreditCard = mongoose.model('CreditCard', creditCardSchema);

module.exports = CreditCard;