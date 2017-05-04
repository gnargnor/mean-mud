app.controller('WorldController', ['CreatorService', '$scope', '$http', '$location', 'UserService', function(CreatorService, $scope, $http, $location, UserService){
  // console.log('CreateController Hit');
  //
  var create = this;
  //
  // create.newWorld = CreatorService.newWorld;
  create.worldsObject = CreatorService.worldsObject;
  create.worldCreator = CreatorService.worldCreator;
  create.worldUpdater = CreatorService.worldUpdater;
  create.worldDeleter = CreatorService.worldDeleter;
  // create.getWorlds = CreatorService.getWorlds;
  // create.editWorld = CreatorService.editWorld;
  //
  // create.locationsObject = CreatorService.locationsObject;
  // create.editLocation = CreatorService.editLocation;
  // create.itemsObject = CreatorService.itemsObject;
  // create.editItem = CreatorService.editItem;
  //
  // create.displayDesc = CreatorService.displayDesc;
  //
  create.messageObject = CreatorService.messageObject;
  //
  // create.addLocation = function(){
  //   $location.path('/newLoc');
  // };
  //
  // create.addItem = function(){
  //   $location.path('/newItem');
  // };
  // console.log('createController : ', create.worldsObject.curWorlds);

}]);
