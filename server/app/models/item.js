'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let itemSchema = new Schema({
  quantity: { type: Number, required: true},
  _product: { type: Schema.Types.ObjectId, ref: 'Product'}
}, {
  timestamps: {}
});

let Item = mongoose.model('Item', itemSchema);

module.exports = {
  Item,
  itemSchema
};