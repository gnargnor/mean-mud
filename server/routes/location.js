var express = require('express');
var router = express.Router();
var Location = require('../models/location');
var path = require('path');

router.post('/', function(req, res){
  console.log('location post route hit: ', req.body);

  var locationServer = new Location({
    locName: req.body.locName,
    dateCreated: new Date(),
    locDesc: req.body.locDesc,
    locShortDesc: req.body.locShortDesc,
    _world: req.body._world,
    _creator: req.user._id
  });
  console.log('locationServer: ', locationServer);
  locationServer.save(function(err, newWorld){
    if (err) {
      console.log('save error: ', err);
    }
    console.log('saved: ', newWorld);
    res.send(newWorld);
  });
});

router.put('/', function(req, res){
  console.log('location put route hit: ', req.body);
  locServer = req.body;
  Location.findOne({'_id' : req.body._id}, function(err, curLoc){
    if (err) {
      console.log('location put err: ', err);
      res.sendStatus(500);
    }
    console.log('curLoc in loc put: ', curLoc);
    curLoc.locName = locServer.locName || curLoc.locName;
    curLoc.locDesc = locServer.locDesc || curLoc.locDesc;
    curLoc.locShortDesc = locServer.locShortdesc || curLoc.locShortDesc;
    curLoc._inventory = locServer._inventory || curLoc._inventory;
    curLoc._exits = locServer._exits || curLoc._exits;
    console.log(curLoc);
    res.sendStatus(200);
  });
});

router.delete('/:locId', function(req, res){
  console.log('location delete route hit: ', req.params.locId);
});

router.get('/:world', function(req, res){
  console.log('location get route hit ', req.params.world);
  var world_id = req.params.world;
  Location.find({'_world': world_id}, function(err, allLocations){
    if (err){
      console.log('location get error: ', err);
      res.sendStatus(500);
    }
    console.log('location get: ', allLocations);
    res.send(allLocations);
  });
});

module.exports = router;
