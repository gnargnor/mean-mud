var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var Location = require('./location');

console.log('location model hit');
// Mongoose Schema
var LocationSchema = new Schema({
  _inventory : [{type: Schema.ObjectId, ref: 'Item'}],
  _world : {type: Schema.ObjectId, ref: 'World'},
  _creator : {type: Schema.ObjectId, ref: 'User'},
  _exits : [{type: Schema.ObjectId, ref: 'Location'}],
  dateCreated : {type: Date, default: Date.now},
  locCoX : {type: Number},
  locCoY : {type: Number},
  locName : {type: String},
  locDesc : {type: String, required: true},
  locShortDesc : {type: String},
  locNotes : {type: String}

});

module.exports = mongoose.model('Location', LocationSchema);
