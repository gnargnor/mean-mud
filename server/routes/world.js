var express = require('express');
var router = express.Router();
var World = require('../models/world');
var path = require('path');

router.get('/', function(req, res){
  World.find({}, function(err, allWorlds){
    if (err) {
      console.log('mongo error: ', err);
      res.sendStatus(500);
    }
    res.send(allWorlds);
  });
});

router.post('/', function(req, res){
  console.log('world post route hit: ', req.body);
  if(req.isAuthenticated()) {
    var worldServer = new World({
      worldName: req.body.worldName,
      dateCreated: new Date(),
      worldDesc: req.body.worldDesc,
      _creator: req.user._id
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
  console.log(req.user._id);
  var worldServer = {
    worldName: req.body.worldName,
    dateCreated: new Date(),
    worldDesc: req.body.worldDesc,
    _creator: req.user._id
  };
  console.log(worldServer);
  World.update({'_id' : req.body._id}, worldServer, function(err, curWorld){
    if (err){
      console.log('world update error');
      res.sendStatus(500);
    }
    console.log(curWorld);
    res.sendStatus(200);
  });

});
//THIS WORKS - FOR THE LOVE OF GOD
router.delete('/:world', function(req, res){
  console.log('world delete route hit: ', req.params.world);
  var delWorld = req.params.world;
  World.deleteOne({'_id' : delWorld})
    .exec(function(err, deleted){
      if (err) {
        console.log('World delete error: ', err);
        res.sendFile(500);
      }
      console.log('World deleted', deleted);
      res.sendStatus(200);
    });
});

module.exports = router;
