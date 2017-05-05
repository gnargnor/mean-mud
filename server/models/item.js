var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var Location = require('./location');

console.log('item model hit');
// Mongoose Schema
var ItemSchema = new Schema({
  _location : {type: Schema.ObjectId, ref: 'Location'},
  _creator : {type: Schema.ObjectId, ref: 'User'},
  _world : {type: Schema.ObjectId, ref: 'World'},
  itemName : {type: String, required: true},
  itemDesc : {type: String, required: true},
  itemTargets : [{type: String}],
  itemNotes : {type: String}


});

module.exports = mongoose.model('Item', ItemSchema);
