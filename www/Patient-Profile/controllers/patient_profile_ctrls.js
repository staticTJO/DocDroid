var patientprofile = angular.module('patientprofile');

patientprofile.controller("passidCtrl",function($scope,$state,$stateParams){
    
    $scope.patientid = $stateParams.patientid;
    
});