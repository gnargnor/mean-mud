var express = require('express');
var router = express.Router();
var World = require('../models/world');
var path = require('path');

router.post('/', function(req, res){
  console.log('world post route hit: ', req.body);
});

router.put('/', function(req, res){
  console.log('world put route hit: ', req.body);
});

router.delete('/', function(req, res){
  console.log('world delete route hit: ', req.body);
});

module.exports = router;
