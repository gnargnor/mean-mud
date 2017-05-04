var express = require('express');
var router = express.Router();
var Location = require('../models/location');
var path = require('path');

router.post('/', function(req, res){
  console.log('location post route hit: ', req.body);
});

router.put('/', function(req, res){
  console.log('location put route hit: ', req.body);
});

router.delete('/', function(req, res){
  console.log('location delete route hit: ', req.body);
});

module.exports = router;
