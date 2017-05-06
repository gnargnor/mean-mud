var express = require('express');
var router = express.Router();
var Sight = require('../models/sight');
var path = require('path');

router.post('/', function(req, res){
  console.log('sight post route hit: ', req.body);
  var sightServer = new Sight({
    _location : {type: Schema.ObjectId, ref: 'Location'},
    _creator : req.user._id,
    dateCreated : {type: Date, default: Date.now},
    sightName : req.body.sightName,
    sightDesc : req.body.sightDesc
  });
});

router.put('/', function(req, res){
  console.log('sight put route hit: ', req.body);
  Sight.findById({'_id' : req.body._id}, function(err, curSight){
    if (err) {
      console.log('sight put error: ', err);
    }
    console.log('curSight in put sight: ', curSight);
  });
});

router.delete('/', function(req, res){
  console.log('sight delete route hit: ', req.body);
});

module.exports = router;
