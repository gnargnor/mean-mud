var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var Location = require('./location');

console.log('sight model hit');
// Mongoose Schema
var SightSchema = new Schema({
  _location : {type: Schema.ObjectId, ref: 'Location', required: true},
  _creator : {type: Schema.ObjectId, ref: 'User', required: true},
  dateCreated : {type: Date, required: true, default: Date.now},
  sightName : {type: String, required: true},
  sightDesc : {type: String, required: true},
  isImportant : {type: Boolean, required: true, default: false},

});

module.exports = mongoose.model('Sight', SightSchema);
