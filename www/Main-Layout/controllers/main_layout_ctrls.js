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

mainlayout.controller("MenuCtrl",function($scope,$ionicSideMenuDelegate,$ionicHistory,MainService,$stateParams,$ionicPopup){
  
    /*Initialize Status, this will be stored in database later on*/
    
    // Need to get most updated version of record before passing it to update function.
    
    var getDoctorStatus = MainService.GetStatusPromise();
    
    getDoctorStatus.then(
        //On Success function
        function(data){
            $scope.onSuccess = true;
            $scope.statusData = data.data;
            $scope.statusID = $scope.statusData.status.id;
            $scope.docstatus = $scope.statusData.status.status;
            if($scope.docstatus == "Available"){
                $scope.statuscolor = "icon-available"; 
            }
            else if($scope.docstatus == "Away"){
                $scope.statuscolor = "icon-away"; 
            }    
            else if($scope.docstatus == "Busy"){
                $scope.statuscolor = "icon-busy"; 
            }

        },

        //On Failure function
            function(reason){
            $scope.somethingwrong = reason;
            $scope.error = true;
        if($scope.error === true){
                var Serverdown = $ionicPopup.alert({
                    title: 'Error Occured!',
                    template: 'Could not load doctor status!'
                    });     
                }
            }

        ); 
    
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
        
        //Get Current Version of Status
        
            
    var getCurrentVersion = MainService.GetStatusPromise();
    
    getCurrentVersion.then(
        //On Success function
        function(data){
            $scope.onSuccess = true;
            $scope.versionData = data.data;
            $scope.CurrentVersion = $scope.versionData.status.version;
            
            var statusObject = {docstatus:$scope.docstatus, version: $scope.CurrentVersion, statusid:$scope.statusID};
            var UpdateStatusPromise = MainService.UpdateStatusPromise(statusObject);
        
        UpdateStatusPromise.then(
            //On Success function
            function(data){
                $scope.onSuccess = true;
                $scope.promiseData = data.data;
            },

            //On Failure function
                function(reason){
                $scope.somethingwrong = reason;
                $scope.error = true;
            if($scope.error === true){
                    var Serverdown = $ionicPopup.alert({
                        title: 'Error Occured!',
                        template: 'Could not update doctor status!'
                        });     
                    }
                }

            ); 
        },

        //On Failure function
            function(reason){
            $scope.somethingwrong = reason;
            $scope.error = true;
        if($scope.error === true){
                var Serverdown = $ionicPopup.alert({
                    title: 'Error Occured!',
                    template: 'Could not get current version of doctor status!'
                    });     
                }
            }

        ); 
        
    };
    
        $scope.openDrawer = function (){
        $ionicSideMenuDelegate.toggleLeft(); 
    };
    
        $scope.closeDrawer = function (){
        $ionicSideMenuDelegate.toggleLeft();   
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

