var docdroid = angular.module("docdroid", []);
docdroid.controller("NavCtrl",function($scope,$ionicSideMenuDelegate,$ionicHistory){

    
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