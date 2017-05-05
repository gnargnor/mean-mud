var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var Location = require('./location');

console.log('location model hit');
// Mongoose Schema
var PlayerSchema = new Schema({
  _inventory : [{type: Schema.ObjectId, ref: 'Item'}],
  _curLoc : {type: Schema.Object.Id, ref: 'Location'},
  _world : {type: Schema.ObjectId, ref: 'World'},
  _creator : {type: Schema.ObjectId, ref: 'User'},





});

module.exports = mongoose.model('Location', LocationSchema);
