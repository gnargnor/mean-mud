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
    dateCreated : new Date(),
    _world : req.body._world,
    _creator : req.user._id
  });
  itemServer.save(function(err, newItem){
    if (err) {
      console.log('item save error: ', err);
    }
    console.log('item saved: ', newItem);
    res.send(newItem);
  });
});

router.put('/', function(req, res){
  console.log('item put route hit: ', req.body);
  itemServer = req.body;
  Item.findOne({'_id' : req.body._id}, function(err, curItem){
    if (err) {
      console.log('item put err: ', err);
      res.sendStatus(500);
    }
    console.log('curItem in item put: ', curItem);
    curItem.itemName = itemServer.itemName || curItem.itemName;
    curItem.itemDesc = itemServer.itemDesc || curItem.itemDesc;
    curItem.save(function(err, savedItem){
      if (err){
        console.log('error in item put: ', err);
        res.sendStatus(500);
      }
      console.log('updated item: ', savedItem);
      res.send(savedItem);
    });
  });
});

router.delete('/:itemId', function(req, res){
  console.log('item delete route hit: ', req.params.itemId);
  var delItem = req.params.itemId;
  Item.deleteOne({'_id' : delItem})
    .exec(function(err, deletedItem){
      if (err) {
        console.log('Item delete error: ', err);
        res.sendStatus(500);
      }
      console.log('Item deleted: ', deletedItem);
      res.sendStatus(200);
    });
});

router.get('/', function(req, res){
  Item.find({}, function(err, allItems){
    if (err) {
      console.log('item get error: ', err);
      res.sendStatus(500);
    }
    console.log('allItems: ', allItems);
    res.send(allItems);
  });
});

router.get('/:worldId', function(req, res){
  console.log('item get route hit ', req.params.worldId);
  var world_id = req.params.worldId;
  Item.find({'_world': world_id}, function(err, allItems){
    if (err) {
      console.log('item get error: ', err);
      res.sendStatus(500);
    }
    console.log('allItems: ', allItems);
    res.send(allItems);
  });
});

module.exports = router;
