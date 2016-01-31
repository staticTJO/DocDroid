var mainlayout = angular.module('mainlayout');

/**
 * Author: Julien Popa-liesz
 *
 * --- Menu Controller ---
 *
 * The menu controller the status button and popovers
 * All the variables are local to the MenuCtrl tag
 * 
 */

mainlayout.controller("MenuCtrl",function($scope,$ionicSideMenuDelegate,$ionicHistory){

    
    /*Initialize Status, this will be stored in database later on*/
        $scope.docstatus = "Available";
        $scope.statuscolor = "icon-available";
        $scope.openDrawer = function (){
        $ionicSideMenuDelegate.toggleLeft(); 
    };
    
        $scope.closeDrawer = function (){
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


/**
 * Author: Julien Popa-liesz
 *
 * --- Notification Popover Controller ---
 *
 * Returns a view of a list of notifications to the user.
 * 
 * 
 */

mainlayout.controller("notificationPopoverCtrl", function($scope,$ionicPopover){
    
$ionicPopover.fromTemplateUrl('./Main-Layout/templates/notification_popover.html', {
   $scope: $scope
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

/**
 * Author: Julien Popa-liesz
 *
 * --- Inbox Popover Controller ---
 *
 * Returns a view of a list of Messages to the user.
 * 
 * 
 */

mainlayout.controller("InboxPopoverCtrl", function($scope,$ionicPopover){
$ionicPopover.fromTemplateUrl('./Main-Layout/templates/inbox_popover.html', {
    $scope: $scope
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