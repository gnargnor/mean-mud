app.controller('LocationController', ['CreatorService', '$scope', '$http', '$location', 'UserService', function(CreatorService, $scope, $http, $location, UserService){
  // console.log('LocationController Hit');
  //
  var location = this;

  //Focuses selected element to corresponding object's curSight
  location.displayDesc = CreatorService.displayDesc;

  location.locationsObject = CreatorService.locationsObject;
  location.locationCreator = CreatorService.locationCreator;
  location.locationUpdater = CreatorService.locationUpdater;
  location.locationDeleter = CreatorService.locationDeleter;

  //SIGHTS
  location.sightsObject = CreatorService.sightsObject;
  location.sightCreator = CreatorService.sightCreator;
  location.sightUpdater = CreatorService.sightUpdater;
  location.sightDeleter = CreatorService.sightDeleter;

  location.addSightView = false;
  location.editSightView = false;
  location.displayDescViewSight = false;

    location.newSight = function(){
      if (location.editSightView || location.displayDescViewSight) {
        location.editSightView = false;
        location.displayDescViewSight = false;
      }
      location.sightsObject.curSight = {};
      location.addSightView = true;
    };

    location.displayViewForSight = function(){
      if (location.editSightView || location.addSightView){
        location.editSightView = false;
        location.addSightView = false;
      }
      location.displayDescViewSight = true;
    };

    location.editSight = function(sight){
      if (location.addSightView || location.displayDescViewSight) {
        location.addSightView = false;
        location.displayDescViewSight = false;
      }
      location.editSightView = true;
    };
    //END SIGHTS

  //EXITS
  location.exitsObject = CreatorService.exitsObject;
  location.exitCreator = CreatorService.exitCreator;
  location.exitUpdater = CreatorService.exitUpdater;
  location.exitDeleter = CreatorService.exitDeleter;

  location.addExitView = false;
  location.editExitView = false;
  location.displayDescViewExit = false;

  location.newExit = function(){
    if (location.editExitView || location.displayDescViewExit) {
      location.editExitView = false;
      location.displayDescViewExit = false;
    }
    location.exitsObject.curExit = {};
    location.addExitView = true;
  };

  location.displayViewForExit = function(){
    if (location.editExitView || location.addExitView){
      location.editExitView = false;
      location.addExitView = false;
    }
    location.displayDescViewExit = true;
  };

  location.editExit = function(exit){
    if (location.addExitView || location.displayDescViewExit) {
      location.addExitView = false;
      location.displayDescViewExit = false;
    }
    location.editExitView = true;
  };


  location.messageObject = CreatorService.messageObject;

  // location.updateSight = CreatorService.updateSight;
  // location.getLocations = CreatorService.getLocations;
  // location.editLocation = CreatorService.editLocation;
  // location.getLocations();


}]);
