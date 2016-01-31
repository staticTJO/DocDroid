var dailyrounds = angular.module('dailyrounds')


dailyrounds.controller("DailyRoundsCtrl",function($scope,$state,$stateParams){
    
    $scope.patient = "patient1";
    
});

dailyrounds.controller("patientprofileCtrl" ,function($scope, $state,$stateParams){
   
    $scope.gotopatient = function(){
    $state.go("main.patientprofile",{patientid: 2345});
    };
     
});