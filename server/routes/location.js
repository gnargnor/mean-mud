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
  locationServer.save(function(err, newLoc){
    if (err) {
      console.log('save error: ', err);
    }
    console.log('saved: ', newLoc);
    res.send(newLoc);
  });
});

router.put('/', function(req, res){
  console.log('location put route hit: ', req.body);
  locServer = req.body;
  console.log(locServer._id);
  Location.findOne({'_id' : req.body._id}, function(err, curLoc){
    if (err) {
      console.log('location put err: ', err);
      res.sendStatus(500);
    }
    console.log('curLoc in loc put: ', curLoc);
    curLoc.locName = locServer.locName || curLoc.locName;
    curLoc.locDesc = locServer.locDesc || curLoc.locDesc;
    curLoc.locShortDesc = locServer.locShortdesc || curLoc.locShortDesc;
    curLoc.locNotes = locServer.locNotes || curLoc.locNotes;
    curLoc._inventory = locServer._inventory || curLoc._inventory;
    curLoc._exits = locServer._exits || curLoc._exits;
    curLoc.save(function(err, savedLoc){
      if (err){
        console.log('error in loc put: ', err);
        res.sendStatus(500);
      }
      console.log('updated location: ', savedLoc);
      res.send(savedLoc);
    });
  });
});

router.delete('/:locId', function(req, res){
  console.log('location delete route hit: ', req.params.locId);
  var delLoc = req.params.locId;
  Location.deleteOne({'_id' : delLoc})
    .exec(function(err, deletedLoc){
      if (err) {
        console.log('Location delete error: ', err);
        res.sendStatus(500);
      }
      console.log('Location deleted: ', deletedLoc);
      res.sendStatus(200);
    });
});

router.get('/:worldId', function(req, res){
  console.log('location get route hit ', req.params.worldId);
  var world_id = req.params.worldId;
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
