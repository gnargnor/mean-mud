var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var Location = require('./location');

console.log('world model hit');
// Mongoose Schema
var GameSchema = new Schema({
  _user : {type: Schema.ObjectId, ref: 'User', required: true},
  _player : {type: Schema.ObjectId, ref: 'Player', required: true},
  _world : {type: Schema.ObjectId, ref: 'World', required: true},
  _curLoc : {type: Schema.ObjectId, ref: 'Location', required: true},
  _locations : [{type: Schema.ObjectId, ref: 'Location'}],
  _inventory : [{type: Schema.ObjectId, ref: 'Item', required: true}],




  active : Boolean,

});

module.exports = mongoose.model('World', WorldSchema);
