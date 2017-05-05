var express = require('express');
var router = express.Router();
var Exit = require('../models/exit');
var path = require('path');

router.post('/', function(req, res){
  console.log('exit post route hit: ', req.body);
});

router.put('/', function(req, res){
  console.log('exit put route hit: ', req.body);
});

router.delete('/', function(req, res){
  console.log('exit delete route hit: ', req.body);
});

module.exports = router;
