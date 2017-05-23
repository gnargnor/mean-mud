app.factory('CreatorService', ['UserService', '$http', '$location', function(UserService, $http, $location){

  //message object

  var messageObject = {
    message: ''
  };

  //angular vessels
  var worldsObject = {
    curWorlds : [],
    curWorld : {
      worldName : '',
      worldDesc : '',
      author : '',
      _locations : []
    }
  };

  var locationsObject = {
    curLocs : [],
    curLoc : {
      locName :'',
      locDesc : '',
      locShortDesc : '',
      locNotes : ''
    }
  };

  var itemsObject = {
    curItems : [],
    curItem : {
      itemName : '',
      itemDesc : '',
      itemNotes : ''
    }
  };

  var sightsObject = {
    curSights : [],
    curSight : {
      keyword : '',
      sightDesc : '',
      isImportant : ''
    }
  };

  var exitsObject = {
    curExits : [],
    curExit : {
      exitDir : '',
      exitDesc : '',
      open : true,
      unlocked : true
    }
  };//angular vessels

  //getters
  var worldGetter = function(){
    $http.get('/world')
      .then(function(response){
        var worldsReturned = response.data;
        worldsObject.curWorlds = [];
        for (i=0;i<worldsReturned.length;i++){
          worldsObject.curWorlds.push(worldsReturned[i]);
        }
        console.log('worldGetter pushed to curWorlds: ', worldsObject.curWorlds);
      });
  };

  var worldCreator = function(newWorld){
    var postWorld = newWorld;
    newWorld = {};
    $http.post('/world', postWorld)
      .then(function(response){
        console.log('worldCreator request: ', response);
        worldsObject.curWorld = response.data;
        worldGetter();
      });
  };

  var locGetter = function(curWorldId){
    if (worldsObject.curWorld._id === ''){
      console.log('curWorld not defined in locationGetter');
      return;
    }
    console.log('curWorld in locGetter ', worldsObject.curWorld._id);
    $http({
      url: '/location/' + curWorldId,
      method: 'GET',
    }).then(function(response){
      var locationsReturned = response.data;
      locationsObject.curLocs = [];
      for (i=0;i<locationsReturned.length; i++){
        locationsObject.curLocs.push(locationsReturned[i]);
      }
      console.log('locGetter pushed: ', locationsObject.curLocs);
    });

};

  var itemGetter = function(curWorldId){
    if (worldsObject.curWorld._id === ''){
      console.log('curWorld is not defined in itemGetter');
      return;
    }
    console.log('curWorld in itemGetter: ', worldsObject.curWorld._id);
    $http({
      url : '/item/' + curWorldId,
      method: 'GET',
    }).then(function(response){
      var itemsReturned = response.data;
      itemsObject.curItems = [];

      console.log('itemGetter response.data: ', response.data);
      for (i = 0; i<itemsReturned.length; i++){
        itemsObject.curItems.push(itemsReturned[i]);
      }
    });
  };

  var sightGetter = function(curLocId){
    if (curLocId === ''){
      console.log('curLoc is not defined in sightGetter');
      return;
    }
    console.log('curLoc in sightGetter: ', curLocId);
    $http({
      url : '/sight/' + curLocId,
      method: 'GET',
    }).then(function(response){
      var sightsReturned = response.data;
      sightsObject.curSights = [];
      console.log('sightGetter response.data: ', response.data);
      for (i = 0; i<sightsReturned.length; i++){
        sightsObject.curSights.push(sightsReturned[i]);
      }
      console.log('sightsReturned: ', sightsReturned);
    });
  };

  var exitGetter = function(curLocId){
    if (curLocId === ''){
      console.log('curLoc is not defined in exitGetter');
      return;
    }
    console.log('curLoc in exitGetter: ', curLocId);
    $http({
      url : '/exit/' + curLocId,
      method: 'GET',
    }).then(function(response){
      var exitsReturned = response.data;
      exitsObject.curExits = [];
      console.log('exitGetter response.data: ', response.data);
      for (i = 0; i<exitsReturned.length; i++){
        exitsObject.curExits.push(exitsReturned[i]);
      }
      console.log('exitsReturned: ', exitsReturned);
    });
  };

  var worldFiller = function(curWorldId){
    locGetter(curWorldId);
    itemGetter(curWorldId);
  };

  var locationFiller = function(curLocId) {

    sightGetter(curLocId);
    exitGetter(curLocId);
  };

  return {

  //message object
  messageObject : messageObject,
  itemGetter : itemGetter,
  // locationGetter : locationGetter,
  worldGetter : worldGetter,
  worldCreator : worldCreator,
  worldFiller : worldFiller,
  locationFiller : locationFiller,

  //angular vessels
  worldsObject : worldsObject,
  locationsObject : locationsObject,
  itemsObject : itemsObject,
  sightsObject : sightsObject,
  exitsObject : exitsObject,

  //world functions



  worldUpdater : function(curWorld){
    var putWorld = curWorld;
    $http.put('/world', putWorld)
      .then(function(response){
        console.log('worldUpdater response: ', response);
        worldGetter();
      });
  },
//THIS WORKS - FOR THE LOVE OF GOD
  worldDeleter : function(curWorldId){
    console.log('world to delete', curWorldId);
    $http({
      url : '/world/' + curWorldId,
      method : 'DELETE'})
      .then(function(response){
        worldsObject.curWorld = {};
        console.log('worldDeleter response: ', response);
        worldGetter();
      });
  },

  //world functions

  //location functions
  locationCreator : function(newLoc){
    newLoc._world = worldsObject.curWorld._id;
    console.log('newLoc._world: ', newLoc);
    $http.post('/location', newLoc)
      .then(function(response){
        console.log('locationCreator request: ', response);
        locGetter(newLoc._world);
        locationsObject.curLoc = response.data;
      });
  },

  locationUpdater : function(curLoc){
    var putLoc = curLoc;
    curLoc = {};
    $http.put('/location', putLoc)
      .then(function(response){
        console.log('locationUpdater response: ', response);
        locGetter(worldsObject.curWorld._id);
        locationsObject.curLoc = response.data;
      });
  },

  locationDeleter : function(curLocId){
    console.log('loc to delete', curLocId);
    $http({
      url : '/location/' + curLocId,
      method : 'DELETE'
    }).then(function(response){
        console.log('worldDeleter response: ', response);
        locationsObject.curLoc = {};
        worldFiller(worldsObject.curWorld._id);
      });
  },//location functions


  //item functions
  itemCreator : function(newItem){
    newItem._world = worldsObject.curWorld._id;
    $http.post('/item', newItem)
      .then(function(response){
        console.log('itemCreator request: ', response);
        itemGetter(worldsObject.curWorld._id);
        itemsObject.curItem = response.data;
      });

  },

  itemUpdater : function(curItem){
    var putItem = curItem;
    curItem = {};
    $http.put('/item', putItem)
      .then(function(response){
        console.log('itemUpdater response: ', response);
        itemGetter(worldsObject.curWorld._id);
        itemsObject.curItem = response.data;
      });

  },

  itemDeleter : function(curItemId){
    console.log('item to delete', curItemId);
    $http({
      url : '/item/' + curItemId,
      method : 'DELETE'
    }).then(function(response){
        console.log('itemDeleter response: ', response);
        itemsObject.curItem = {};
        worldFiller(worldsObject.curWorld._id);
      });
  },
  //item functions

  //sight functions
  sightCreator : function(newSight){
    newSight._location = locationsObject.curLoc._id;
    $http.post('/sight', newSight)
      .then(function(response){
        console.log('sightCreator request: ', response);
        sightGetter(locationsObject.curLoc._id);
        sightsObject.curSight = response.data;
      });

  },

  sightUpdater : function(curSight){
    var putSight = curSight;
    curSight = {};
    $http.put('/sight', putSight)
      .then(function(response){
        console.log('sightUpdater response: ', response);
        sightGetter(locationsObject.curLoc._id);
        sightsObject.curSight = response.data;
      });

  },

  sightDeleter : function(curSightId){
    console.log('sight to delete', curSightId);
    $http({
      url : '/sight/' + curSightId,
      method : 'DELETE'
    }).then(function(response){
        console.log('sightDeleter response: ', response);
        sightsObject.curSight = {};
        sightGetter(locationsObject.curLoc._id);
      });
  },

  exitCreator : function(newExit){
    newExit._location = locationsObject.curLoc._id;
    $http.post('/exit', newExit)
      .then(function(response){
        console.log('exitCreator response: ', response);
        exitGetter(locationsObject.curLoc._id);
        exitsObject.curExit = response.data;
      });

  },

  destinationUpdater : function(destLoc, exit){
    $http.put('/location/destination/' + destLoc + '/' + exit)
      .then(function(response){
        console.log('destinationUpdater response: ', response.data);
      });
  },

  exitUpdater : function(curExit){
    console.log('curExit in exitUpdater: ', curExit._id);
    var putExit = curExit;
    newExit = {};
    $http.put('/exit', putExit)
      .then(function(response){
        console.log('exitCreator response: ', response);
        exitGetter(locationsObject.curLoc._id);
        exitsObject.curExit = response.data;
      });

  },

  exitDeleter : function(curExitId){
    console.log('exit to delete', curExitId);
    $http({
      url : '/exit/' + curExitId,
      method : 'DELETE'
    }).then(function(response){
        console.log('exitDeleter response: ', response);
        exitsObject.curExit = {};
        exitGetter(locationsObject.curLoc._id);
      });

  },

  displayDesc : function(typeOfInput){
    console.log(typeOfInput);
    if (typeOfInput.worldName){
      var world = typeOfInput;
      worldsObject.curWorld = world;
    } else if (typeOfInput.locName){
      var location = typeOfInput;
      locationsObject.curLoc = location;
      console.log('displayDesc: ', location);
    } else if (typeOfInput.itemName){
      var item = typeOfInput;
      itemsObject.curItem = item;
    } else if (typeOfInput.sightDesc){
      var sight = typeOfInput;
      sightsObject.curSight = sight;
    } else if (typeOfInput.exitDesc){
      var exit = typeOfInput;
      exitsObject.curExit = exit;
    } else {
      messageObject.message = "display error: bad code";
    }
  },
  //
  // var locationsObject = {
  //   curLocs : [],
  //   curLoc : {
  //     sights: [],
  //     curSight: {}
  //   }
  // };
  //
  // var itemsObject = {
  //   curItems : [],
  //   curItem : {}
  // };
  //
  // var newWorld = {
  //   worldName: '',
  // 	author: '',
  // 	dateCreated: undefined,
  // 	shortDesc: '',
  // };
  //
  // var newLoc = {
  //   locName: '',
  //   locShortDesc: '',
  //   locDesc: '',
  //   locNotes: '',
  // };
  //
  // var newItem = {
  //   itemName: '',
  //   itemDesc: '',
  //   itemNotes: '',
  // };
  //
  // //world creator

  //   var curWorld = {};
  //   curWorld.worldName = newWorld.worldName;
  //   curWorld.shortDesc = newWorld.shortDesc;
  //   //change this to user id?
  //   curWorld.author = newWorld.author;
  //   if (curWorld.worldName === '' || curWorld.shortDesc === '' || curWorld.author === '') {
  //       messageObject.message = "All fields are required.";
  //       return;
  //   }
  //   console.log('world creator: ', curWorld);
  //   newWorld.worldName = '';
  //   newWorld.shortDesc = '';
  //   newWorld.author = '';
  //   addToUniverse(curWorld);
  // };
  //
  // var locationCreator = function(newLoc) {
  //   var curLoc = {};
  //   curLoc.locName = newLoc.locName;
  //   curLoc.locShortDesc = newLoc.locShortDesc;
  //   curLoc.locDesc = newLoc.locDesc;
  //   curLoc.worldID = worldsObject.curWorld._id;
  //   console.log('locationsObject at location creator: ', locationsObject.curWorld);
  //   if (curLoc.locName === '' || curLoc.locShortDesc === '' || curLoc.locDesc === '') {
  //       messageObject.message = "All fields are required.";
  //       return;
  //   }
  //   console.log('location creator: ', curLoc);
  //   newLoc.locName = '';
  //   newLoc.locShortDesc = '';
  //   newLoc.locDesc = '';
  //   locationsObject.curLoc = curLoc;
  //   addLocToWorld(curLoc);
  // };
  //
  // var itemCreator = function(newItem) {
  //   var curItem = {};
  //   curItem.itemName = newItem.itemName;
  //   curItem.itemShortDesc = newItem.itemShortDesc;
  //   curItem.itemDesc = newItem.itemDesc;
  //   if (curItem.itemName === '' || curItem.itemDesc === '') {
  //       messageObject.message = "All fields are required.";
  //       return;
  //   }
  //   console.log('item creator: ', curItem);
  //   newItem.itemName = '';
  //   newItem.itemDesc = '';
  //   newItem.itemNotes = '';
  //   itemsObject.curItem = curItem;
  //   addItemToWorld(curItem);
  // };//end item creator
  //
  // var addToUniverse = function(curWorld) {
  //       return $http.post('/create', curWorld)
  //           .then(function(response) {
  //               console.log('addToUniverse: ', response);
  //               worldsObject.curWorld = response.data;
  //               getWorlds();
  //               $location.path('/worlds');
  //             });
  //       };
  //
  // var updateWorld = function(curWorld){
  //   $http.put('/create', curWorld)
  //     .then(function(response){
  //       worldsObject.curWorld = response.data;
  //       //updates locations according to world update
  //       getLocations();
  //       //updates worldsObject.curWorlds to include the new update in the current world - maybe unnecessary
  //       getWorlds();
  //
  //       console.log('updated world: ', worldsObject.curWorld);
  //     });
  // };
  //
  // var editWorld = function(world) {
  //   locationsObject.curLocs = [];
  //   locationsObject.curLoc = {};
  //   getLocations();
  //   $location.path('/worldHome');
  // };
  //
  // var editLocation = function(curLoc){
  //   locationsObject.curLoc = curLoc;
  //   $location.path('/existingLoc');
  // };
  //
  // var addLocToWorld = function(newLoc) {
  //   worldsObject.curWorld.locations.push(newLoc);
  //   updateWorld(worldsObject.curWorld);
  //   locationsObject.curLoc = newLoc;
  //   $location.path('/existingLoc');
  // };
  //
  // var addSightToLoc = function(sight){
  //   var newSight = {};
  //   newSight.keyword = sight.keyword;
  //   newSight.sightDesc = sight.sightDesc;
  //   newSight.isImportant = sight.isImportant || false;
  //   newSight.locID = locationsObject.curLoc._id;
  //   newSight.worldID = worldsObject.curWorld._id;
  //   console.log('new sight added: ', newSight);
  //   sight.keyword = '';
  //   sight.sightDesc = '';
  //   sight.isImportant = false;
  //   locationsObject.curLoc.sights.push(newSight);
  //   locationsObject.curLoc.curSight = newSight;
  //   var locSaver = locationsObject.curLoc;
  //   console.log(locationsObject.curLoc.sights);
  //   updateLocation(locationsObject.curLoc);
  //   locationsObject.curLoc = locSaver;
  //   // editSight(locationsObject.curLoc.sights.curSight);
  // };
  //
  // var updateLocation = function(curLoc){
  //   console.log('location to update: ', curLoc);
  //   for (i=0; i<worldsObject.curWorld.locations.length; i++){
  //     if (curLoc._id === worldsObject.curWorld.locations[i]._id){
  //       worldsObject.curWorld.locations[i] = curLoc;
  //     }
  //   }
  //   updateWorld(worldsObject.curWorld);
  // };
  //
  // var updateSight = function(curSight){
  //   console.log('sight in edit sight : ', curSight);
  //   for (i = 0; i<locationsObject.curLoc.sights.length; i++){
  //     if (locationsObject.curLoc.sights[i]._id === curSight._id){
  //       locationsObject.curLoc.sights[i] = curSight;
  //       locationsObject.curLoc.sights.curSight = curSight;
  //       console.log('editCurSight match: ',locationsObject.curLoc.sights[i]);
  //     }
  //   }
  //   updateLocation(locationsObject.curLoc);
  // };
  //
  //
  //
  //
  //
  //
  //
  // // var newSight = {
  // //   keyword: '',
  // //   sightDesc: '',
  // //   isImportant: true
  // // };
  //
  // // var updateSights = function(sight){
  // //   if (sight._id){
  // //
  // //   } else {
  // //
  // //   }
  // // };
  //
  // // var commitLocation = function(location){
  // //
  // // }
  // //location definitions
  //
  // //item definitions
  //
  //
  //
  // var addItemToWorld = function(newItem) {
  //   $http.post('/item', newItem)
  //     .then(function(response){
  //       console.log('addItemToWorld: ', response);
  //       getItems();
  //       $location.path('/editItem');
  //     });
  // };//end addItemToWorld
  //
  //
  //
  // // var getItems = function() {
  // //   $http.get('/item')
  // //     .then(function(response){
  // //       console.log('get items: ', response);
  // //       itemsObject.curItems = response.data;
  // //       return itemsObject.curItems;
  // //     });
  // // };
  //
  // var editItem = function(){
  //   // itemsObject.curItem = item;
  //   $location.path('/existingItem');
  // };
  // //item definitions
  //

  //
  // var getActiveUniverse = function(){
  //   $http.get('/universe/active')
  //     .then(function(response){
  //       console.log('getActiveUniverse: ', response.data);
  //       // itemsObject.curItems = response.data;
  //       // return itemsObject.curItems;
  //     });
  // };
  //
  // var getWorlds = function(){
  //     return $http.get('/create')
  //       .then(function(response){
  //         console.log('getWorlds: ', response.data);
  //         worldsObject.curWorlds = response.data;
  //         // getLocations();
  //       });
  // };
  //
  // var getLocations = function() {
  //   locationsObject.curLocs = worldsObject.curWorld.locations;
  //   locationsObject.curWorld = worldsObject.curWorld._id;
  // };
  //
  // var getLocationTest = function() {
  //   return $http.get('/location')
  //     .then(function(response){
  //       console.log(response);
  //       // getLocations();
  //     });
  // };
  //
  // // getLocationTest();
  //
  //
  //
  // //get calls
  // getActiveUniverse();
  // getWorlds();
  // // getLocations();
  // // getItems();
  //
  };
}]);
