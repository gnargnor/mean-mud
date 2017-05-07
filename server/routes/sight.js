var express = require('express');
var router = express.Router();
var Sight = require('../models/sight');
var path = require('path');

router.post('/', function(req, res){
  console.log('sight post route hit: ', req.body);
  var sightServer = new Sight({
    _location : req.body._location,
    _creator : req.user._id,
    dateCreated : new Date(),
    sightName : req.body.sightName,
    sightDesc : req.body.sightDesc,
    isImportant : req.body.isImportant
  });
  sightServer.save(function(err, savedSight){
    if(err){
      console.log('sight post error: ', err);
      res.sendStatus(500);
    }
    console.log('sight saved: ', savedSight);
    res.sendStatus(200);
  });
});

router.put('/', function(req, res){
  console.log('sight put route hit: ', req.body);
  var putSight = req.body;
  Sight.findById({'_id' : req.body._id}, function(err, curSight){
    if (err) {
      console.log('put sight update error: ', err);
      res.sendStatus(500);
    }
    console.log('curSight in put sight: ', curSight);
    curSight.sightName = putSight.sightName || curSight.sightName;
    curSight.sightDesc = putSight.sightDesc || curSight.sightDesc;
    curSight.isImportant = putSight.isImportant || curSight.isImportant;
    curSight.save(function(err, updatedSight){
      if (err){
        console.log('put sight save error: ', err);
        res.sendStatus(500);
      }
      console.log('sight updated: ', updatedSight);
      res.sendStatus(200);
    });
  });
});

router.delete('/:sightId', function(req, res){
  console.log('sight delete route hit: ', req.params.sightId);
  var delSightId = req.params.sightId;
  Sight.deleteOne({'_id' : delSightId})
    .exec(function(err, deletedSight){
      if (err){
        console.log('error deleting sight: ', err);
        res.sendStatus(500);
      }
      console.log('sight deleted: ', deletedSight);
      res.sendStatus(200);
    });
});

router.get('/:locId', function(req, res){
  console.log('sight get route hit: ', req.params.locId);
  var loc_id = req.params.locId;
  Sight.find({'_location' : loc_id}, function(err, allSights){
    if (err) {
      console.log('sight get error: ', err);
      res.sendStatus(500);
    }
    console.log('allSights: ', allSights);
    res.send(allSights);
  });
});

module.exports = router;
