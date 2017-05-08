var express = require('express');
var router = express.Router();
var Game = require('../models/game');
var World = require('../models/world');
var Location = require('../models/location');
var Item = require('../models/item');
var Sight = require('../models/sight');
var Exit = require('../models/exit');
var path = require('path');

router.post('/newGame/:worldName', function(req, res){
  console.log('game post route hit: ', req.params.worldName);
  var world_name = req.params.worldName.toString();
  var world_id;
  var game_locations = [];
  var game_items = [];

  World.findOne({'worldName' : world_name}, function(err, gameWorld){
    if (err) {
      console.log('world find error in play request: ', gameWorld);
      res.sendStatus(500);
    }
    console.log('gameWorld: ', gameWorld);
    world_id = gameWorld._id;
    console.log('world_id right after it was defined: ', world_id);
    Location.find({'_world' : world_id}, function(err, gameLocations){
      if (err) {
        console.log('gameLocations find error in play request: ', gameLocations);
        res.sendStatus(500);
      }
      for (i=0;i<gameLocations.length;i++){
        game_locations.push(gameLocations[i]._id);
      }
      console.log('gameLocations: ', game_locations);
    });
    Item.find({'_world' : world_id}, function(err, gameItems){
      if (err){
        console.log('gameItems find error in play request: ', err);
        res.sendStatus(500);
      }
      console.log('gameItems:', gameItems);
      for (i=0;i<gameItems.length;i++){
        game_items.push(gameItems[i]._id);
      }
      console.log('gameItems: ', game_items);
      var newGame = new Game({
        _user : req.user._id,
        _world : world_id,
        _locations : game_locations,
        _inventory : game_items,
        dateCreated: new Date(),
        active: true,


      });
      console.log('new game: ', newGame);
    });
  // var newGame = new Game({
  //   _user : req.user._id,
  //   _world : world_id,
  //   _locations : game_locations,
  //
  // });
  // console.log('new game: ', newGame);


  });
});

router.put('/', function(req, res){
  console.log('game put route hit: ', req.body);
});

router.delete('/', function(req, res){
  console.log('game delete route hit: ', req.body);
});

router.get('/:worldName', function(req, res){
  console.log('game get route hit', req.params.worldName);
});
module.exports = router;
