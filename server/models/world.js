var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var Location = require('./location');

console.log('world model hit');
// Mongoose Schema
var WorldSchema = new Schema({
  _creator : {type: Schema.ObjectId, ref: 'User'},
  _locations : [{type: Schema.ObjectId, ref: 'Location'}],
  _items : [{type: Schema.ObjectId, ref: 'Item'}],
  dateCreated : {type: Date, default: Date.now},
  worldName : {type: String, required: true},
  worldDesc : {type: String, required: true},



  active : {type: Boolean, default: false}

});

module.exports = mongoose.model('World', WorldSchema);
