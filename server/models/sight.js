var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var Location = require('./location');

console.log('sight model hit');
// Mongoose Schema
var SightSchema = new Schema({
  _location : {type: Schema.ObjectId, ref: 'Location'},
  _creator : {type: Schema.ObjectId, ref: 'User'},
  dateCreated : {type: Date, default: Date.now},
  sightName : {type: String, required: true},
  sightDesc : {type: String, required: true},



});

module.exports = mongoose.model('Sight', SightSchema);
