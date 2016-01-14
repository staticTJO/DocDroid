var docdroid = angular.module('docdroid', ['ionic']);


docdroid.controller("HomeMenuCtrl",function($scope,$ionicSideMenuDelegate){
    
    $scope.openDrawer = function (){
        $ionicSideMenuDelegate.toggleLeft();
    };
    
    $scope.changeStatus = function(){
        
    };
});
