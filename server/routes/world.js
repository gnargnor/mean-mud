var express = require('express');
var router = express.Router();
var World = require('../models/world');
var path = require('path');

router.get('/', function(req, res){
  World.find({'_creator' : req.user._id}, function(err, allWorlds){
    if (err) {
      console.log('mongo error: ', err);
      res.sendStatus(500);
    }
    res.send(allWorlds);
  });
});

router.post('/', function(req, res){
  console.log('world post route hit: ', req.body);
  console.log(req.user);
  if(req.isAuthenticated()) {
    var worldServer = new World({
      worldName: req.body.worldName,
      dateCreated: new Date(),
      worldDesc: req.body.worldDesc,
      _creator: req.user._id,
      author: req.user.username
    });
    console.log(worldServer);
    // console.log(MongoDB.Universe.worlds);
    worldServer.save(function(err, newWorld){
      if (err) {
        console.log('save error: ', err);
      }
      console.log('saved: ', newWorld);
      res.send(newWorld);
    });
  } else {
    res.sendStatus(401);
  }
});

router.put('/', function(req, res){
  console.log('world put route hit: ', req.body);
  var worldServer = req.body;
  console.log(worldServer);
  World.findOne({'_id' : req.body._id}, function(err, curWorld){
    if (err){
      console.log('world update error: ', err);
      res.sendStatus(500);
    }
    console.log('curWorld in world put: ', curWorld);
    curWorld.worldName = worldServer.worldName || curWorld.worldName;
    curWorld.worldDesc = worldServer.worldDesc || curWorld.worldDesc;
    curWorld.active = worldServer.active || curWorld.active;
    curWorld.save(function(err, savedWorld){
      if (err){
        console.log('error in world put: ', err);
        res.sendStatus(500);
      }
      console.log('updated world: ', savedWorld);
      res.sendStatus(200);
    });
  });
});

//THIS WORKS - FOR THE LOVE OF GOD
router.delete('/:worldId', function(req, res){
  console.log('world delete route hit: ', req.params.worldId);
  var delWorld = req.params.worldId;
  World.deleteOne({'_id' : delWorld})
    .exec(function(err, deletedWorld){
      if (err) {
        console.log('World delete error: ', err);
        res.sendStatus(500);
      }
      console.log('World deleted', deletedWorld);
      res.sendStatus(200);
    });
});

module.exports = router;
