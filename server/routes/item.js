var express = require('express');
var router = express.Router();
var Item = require('../models/item');
var path = require('path');

router.post('/', function(req, res){
  console.log('item post route hit: ', req.body);
  var itemServer = new Item({
    itemName : req.body.itemName,
    itemDesc : req.body.itemDesc,
    itemNotes : req.body.itemNotes,
    dateCreated : new Date()
  });
  itemServer.save(function(err, newItem){
    if (err) {
      console.log('item save error: ', err);
    }
    console.log('item saved: ', newItem);
    res.send(200);
  });
});

router.put('/', function(req, res){
  console.log('item put route hit: ', req.body);
});

router.delete('/', function(req, res){
  console.log('item delete route hit: ', req.body);
});

router.get('/', function(req, res){
  console.log('item get route hit');
  Item.find({}, function(err, allItems){
    if (err) {
      console.log('item get error: ', err);
    }
    console.log('allItems: ', allItems);
    res.send(allItems);
  });
});

module.exports = router;
