var express = require('express');
var router = express.Router();
var Game = require('../models/game');
var path = require('path');

router.post('/', function(req, res){
  console.log('game post route hit: ', req.body);
});

router.put('/', function(req, res){
  console.log('game put route hit: ', req.body);
});

router.delete('/', function(req, res){
  console.log('game delete route hit: ', req.body);
});

module.exports = router;
