var express = require('express');
var router = express.Router();
var Sight = require('../models/sight');
var path = require('path');

router.post('/', function(req, res){
  console.log('sight post route hit: ', req.body);
});

router.put('/', function(req, res){
  console.log('sight put route hit: ', req.body);
});

router.delete('/', function(req, res){
  console.log('sight delete route hit: ', req.body);
});

module.exports = router;
