'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let creditcardSchema = new Schema({
  number: { type: String, required: true, unique: true },
  owner: { type: Schema.Types.ObjectId, ref: 'Account'}
}, {
  timestamps: {}
});

let Creditcard = mongoose.model('Creditcard', creditcardSchema);

module.exports = Creditcard;