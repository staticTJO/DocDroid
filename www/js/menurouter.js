var docdroid = angular.module('docdroid', ['ionic']);


docdroid.controller("HomeMenuCtrl",function($scope,$ionicSideMenuDelegate){
            /*Initialize Status, this will be stored in database later on*/
        $scope.docstatus = "Available";
        $scope.statuscolor = "icon-available";
    $scope.openDrawer = function (){
        $ionicSideMenuDelegate.toggleLeft();
    };
    
    $scope.changeStatus = function(){
    
        
        if($scope.docstatus.valueOf() == "Available"){
            $scope.docstatus = "Away";
            $scope.statuscolor ="icon-away";
        }
        else if ($scope.docstatus.valueOf() == "Away"){
            $scope.docstatus = "Busy";
            $scope.statuscolor ="icon-busy";
        }
        else if ($scope.docstatus.valueOf() == "Busy"){
            $scope.docstatus ="Available";
            $scope.statuscolor ="icon-available";
        }
    };
});

docdroid.controller("notificationPopoverCtrl", function($scope,$ionicPopover){
$ionicPopover.fromTemplateUrl('./templates/notificationPopover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });
    
$scope.openPopover = function($event) {
$scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });
    
});

docdroid.controller("InboxPopoverCtrl", function($scope,$ionicPopover){
$ionicPopover.fromTemplateUrl('./templates/inboxPopover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });
    
$scope.openPopover = function($event) {
$scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });
    
});
