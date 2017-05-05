var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var Location = require('./location');

console.log('exit model hit');
// Mongoose Schema
var ExitSchema = new Schema({
  _location : {type: Schema.ObjectId, ref: 'Location'},
  exitDir : {type: String, required: true},
  exitDesc : {type: String, required: true}
  

});

module.exports = mongoose.model('Exit', ExitSchema);
