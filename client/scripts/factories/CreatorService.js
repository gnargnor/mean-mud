app.factory('CreatorService', ['$http', '$location', function($http, $location){

  return {//message object
  messageObject : {
    message: ''
  },

  // var Universe = {};
  //
  // //world definitions
  worldsObject : {
    curWorlds : [],
    curWorld : {
      worldName : '',
      worldDesc : '',
      author : ''
    }
  },

  locationsObject : {
    curLocs : [],
    curLoc : {
      locName :'',
      locDesc : '',
      locShortDesc : '',
      locNotes : ''
    }
  },

  worldCreator : function(newWorld){
    var postWorld = newWorld;
    newWorld = {};
    $http.post('/world', postWorld)
      .then(function(response){
        console.log('worldCreator request: ', response);
      });
  },

  worldUpdater : function(curWorld){
    var putWorld = curWorld;
    curWorld = {};
    $http.put('/world', putWorld)
      .then(function(response){
        console.log('worldUpdater response: ', response);
      });
  },

  worldDeleter : function(curWorld){
    delWorld = curWorld;
    $http.delete('/world', delWorld)
      .then(function(response){
        console.log('worldDeleter response: ', response);
      });
  },

  locationCreator : function(newLoc){
    var postLoc = newLoc;
    curLoc = {};
    $http.post('/location', postLoc)
      .then(function(response){
        console.log('locationCreator request: ', response);
      });
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
  }
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
  // var displayDesc = function(typeOfInput){
  //   console.log(typeOfInput);
  //   if (typeOfInput.worldName){
  //     var world = typeOfInput;
  //     worldsObject.curWorld = world;
  //   } else if (typeOfInput.locName){
  //
  //     var location = typeOfInput;
  //     locationsObject.curLoc = location;
  //     console.log('displayDesc: ', locationsObject.curLoc);
  //   } else if (typeOfInput.itemName){
  //     var item = typeOfInput;
  //     itemsObject.curItem = item;
  //   } else if (typeOfInput.sightDesc){
  //     var sight = typeOfInput;
  //     locationsObject.curLoc.curSight = sight;
  //   } else {
  //     messageObject.message = "display error: bad code";
  //   }
  // };
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
