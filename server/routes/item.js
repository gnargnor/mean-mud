var express = require('express');
var router = express.Router();
var Item = require('../models/item');
var path = require('path');

router.post('/', function(req, res){
  console.log('item post route hit: ', req.body);
});

router.put('/', function(req, res){
  console.log('item put route hit: ', req.body);
});

router.delete('/', function(req, res){
  console.log('item delete route hit: ', req.body);
});

module.exports = router;
