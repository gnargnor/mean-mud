var express = require('express');
var router = express.Router();
var Exit = require('../models/exit');
var path = require('path');

router.post('/', function(req, res){
  console.log('exit post route hit: ', req.body);
  var exitServer = new Exit({
    _location : req.body._location,
    _creator : req.user._id,
    dateCreated : new Date(),
    exitDir : req.body.exitDir,
    exitDesc : req.body.exitDesc,
    open : req.body.open,
    unlocked : req.body.unlocked
  });
  exitServer.save(function(err, savedExit){
    if(err){
      console.log('exit post error: ', err);
      res.sendStatus(500);
    }
    console.log('exit saved: ', savedExit);
    res.sendStatus(200);
  });
});

router.put('/', function(req, res){
  console.log('exit put route hit: ', req.body);
  var putExit = req.body;
  Exit.findById({'_id' : req.body._id}, function(err, curExit){
    if (err) {
      console.log('put exit update error: ', err);
      res.sendStatus(500);
    }
    console.log('curExit in put exit: ', curExit);
    curExit.exitDir = putExit.exitDir || curExit.exitDir;
    curExit.exitDesc = putExit.exitDesc || curExit.exitDesc;
    curExit.open = putExit.open || curExit.open;
    curExit.unlocked = putExit.unlocked || curExit.unlocked;
    curExit.save(function(err, updatedExit){
      if (err){
        console.log('put exit save error: ', err);
        res.sendStatus(500);
      }
      console.log('exit updated: ', updatedExit);
      res.sendStatus(200);
    });
  });
});

router.delete('/:exitId', function(req, res){
  console.log('exit delete route hit: ', req.params.exitId);
  var delExitId = req.params.exitId;
  Exit.deleteOne({'_id' : delExitId})
    .exec(function(err, deletedExit){
      if (err){
        console.log('error deleting exit: ', err);
        res.sendStatus(500);
      }
      console.log('exit deleted: ', deletedExit);
      res.sendStatus(200);
    });
});

router.get('/:locId', function(req, res){
  console.log('exit get route hit: ', req.params.locId);
  var loc_id = req.params.locId;
  Exit.find({'_location' : loc_id}, function(err, allExits){
    if (err) {
      console.log('exit get error: ', err);
      res.sendStatus(500);
    }
    console.log('allExits: ', allExits);
    res.send(allExits);
  });
});

module.exports = router;
