var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var Location = require('./location');

console.log('world model hit');
// Mongoose Schema
var GameSchema = new Schema({
  dateCreated : {type: Date, default: Date.now},
  _user : {type: Schema.ObjectId, ref: 'User', required: true},
  _player : {type: Schema.ObjectId, ref: 'Player'},
  _world : {type: Schema.ObjectId, ref: 'World', required: true},
  _curLoc : {type: Schema.ObjectId, ref: 'Location', required: true},
  _locations : [{type: Schema.ObjectId, ref: 'Location', required: true}],
  _inventory : [{type: Schema.ObjectId, ref: 'Item', required: true}],
  active : {type: Boolean},
});

module.exports = mongoose.model('Game', GameSchema);
