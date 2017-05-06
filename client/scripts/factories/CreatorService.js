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
    curSights : [{keyword: 'crap', sightDesc: 'dirty crap', isImportant: false}],
    curSight : {
      keyword : '',
      sightDesc : '',
      isImportant : ''
    }
  };

  var exitsObject = {
    curExits : [{exitDir: 'north', exitDesc: 'You see a door', open: false, unlocked: true}],
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

  // var locationGetter = function(){
  //   $http.get('/location')
  //     .then(function(response){
  //       var locationsReturned = response.data;
  //       locationsObject.curLocs = [];
  //       for (i=0;i<locationsReturned.length; i++){
  //         locationsObject.curLocs.push(locationsReturned[i]);
  //         worldsObject.curWorld._locations.push(locationsReturned[i]._id);
  //       }
  //       console.log('locationGetter: ', locationsObject.curLocs);
  //     });
  // };

  var locGetter = function(curWorldId){
    if (worldsObject.curWorld._id === ''){
      console.log('curWorld not defined in locationGetter');
    }
    console.log('curWorld in locGetter ', worldsObject.curWorld._id);
    $http({
      url: '/location/' + curWorldId,
      method: 'GET',
    }).then(function(response){
      console.log('locGetter response.data: ', response.data);
      for (i=0;i<locationsReturned.length; i++){
              locationsObject.curLocs.push(locationsReturned[i]);
              worldsObject.curWorld._locations.push(locationsReturned[i]._id);
            }
            console.log('locGetter pushed: ', locationsObject.curLocs, worldsObject.curWorld._locations);
    });

};

  var itemGetter = function(){
    $http.get('/item')
      .then(function(response){
        if (worldsObject.curWorld.worldName === ''){
          console.log('itemGetter: curWorld not defined');
          return;
        }
        var itemsReturned = response.data;
        itemsObject.curItems = [];
        for (i=0;i<itemsReturned.length; i++){
          itemsObject.curItems.push(itemsReturned[i]);
          worldsObject.curWorld._items.push(itemsReturned[i]._id);
        }
    });
  };

  return {

  //message object
  messageObject : messageObject,
  itemGetter : itemGetter,
  // locationGetter : locationGetter,
  worldGetter : worldGetter,

  //angular vessels
  worldsObject : worldsObject,
  locationsObject : locationsObject,
  itemsObject : itemsObject,
  sightsObject : sightsObject,
  exitsObject : exitsObject,

  //world functions

  worldCreator : function(newWorld){
    var postWorld = newWorld;
    newWorld = {};
    $http.post('/world', postWorld)
      .then(function(response){
        console.log('worldCreator request: ', response);
        worldsObject.curWorlds.push(response.data);
        worldGetter();
      });
  },

  worldUpdater : function(curWorld){
    var putWorld = curWorld;
    $http.put('/world', putWorld)
      .then(function(response){
        console.log('worldUpdater response: ', response);
      });
  },
//THIS WORKS - FOR THE LOVE OF GOD
  worldDeleter : function(curWorldId){
    console.log('world to delete', curWorldId);
    $http({
      url : '/world/' + curWorldId,
      method : 'DELETE'})
      .then(function(response){
        console.log('worldDeleter response: ', response);
        worldGetter();
      });
  },

  worldFiller : function(curWorldId){
    locGetter(curWorldId);
    // itemGetter(curWorldId);
  },//world functions

  //location functions
  locationCreator : function(newLoc){
    newLoc._world = worldsObject.curWorld._id;
    console.log('newLoc._world: ', newLoc);
    $http.post('/location', newLoc)
      .then(function(response){
        console.log('locationCreator request: ', response);
      });
      console.log('locGetter in locCreator: ', newLoc);
    locGetter(newLoc._world);
  },

  locationUpdater : function(curLoc){
    var putLoc = curLoc;
    curLoc = {};
    $http.put('/location', putLoc)
      .then(function(response){
        console.log('locationUpdater response: ', response);
      });
  },

  locationDeleter : function(curLoc){
    var delLoc = curLoc;
    curLoc = {};
    $http.delete('/location', delLoc)
      .then(function(response){
        console.log('locationDeleter: ', response);
      });
  },//location functions


  //item functions
  itemCreator : function(newItem){
    newItem._world = worldsObject.curWorld._id;
    $http.post('/item', newItem)
      .then(function(response){
        console.log('itemCreator request: ', response);
      });
    itemGetter();
  },

  itemUpdater : function(curItem){
    var putItem = curItem;
    curItem = {};
    $http.put('/item', putItem)
      .then(function(response){
        console.log('itemUpdater response: ', response);
      });
  },

  itemDeleter : function(curItem){
    var delItem = curItem;
    curItem = {};
    $http.delete('/item', delItem)
      .then(function(response){
        console.log('itemDeleter response: ', response);
      });
  },
  //item functions

  //sight functions
  sightCreator : function(newSight){
    var postSight = newSight;
    curSight = {};
    $http.post('/sight', postSight)
      .then(function(response){
        console.log('sightCreator request: ', response);
      });
  },

  sightUpdater : function(curSight){
    var putSight = curSight;
    curSight = {};
    $http.put('/sight', putSight)
      .then(function(response){
        console.log('sightUpdater response: ', response);
      });
  },

  sightDeleter : function(curSight){
    var delSight= curSight;
    curSight = {};
    $http.delete('/sight', delSight)
      .then(function(response){
        console.log('sightDeleter response: ', response);
      });
  },

  exitCreator : function(newExit){
    var postExit = newExit;
    newExit = {};
    $http.post('/exit', postExit)
      .then(function(response){
        console.log('exitCreator response: ', response);
      });
  },

  exitUpdater : function(curExit){
    var putExit = curExit;
    newExit = {};
    $http.put('/exit', putExit)
      .then(function(response){
        console.log('exitCreator response: ', response);
      });
  },

  exitDeleter : function(curExit){
    var delExit = curExit;
    curExit = {};
    $http.delete('/exit', delExit)
      .then(function(response){
        console.log('exitCreator response: ', response);
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
      console.log('displayDesc: ', locationsObject.curLoc);
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
