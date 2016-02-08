var patientprofile = angular.module('patientprofile');

/**
 * Author: Julien Popa-liesz
 *
 * --- Patient Controller ---
 *
 * This controller manages the state transitions and tab buttons of the patient profile interface.
 * All the variables are local to the Patient Controller tag
 * 
 */

patientprofile.controller("PatientCtrl",function($scope,$state,$stateParams){
    
    $scope.patientid = $stateParams.patientid;
    
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) { 
    
 /*Initialized the info state inside the patient profile state*/
    if(toState.name == 'main.patientprofile') {
     $state.go("main.patientprofile.information");
 // Sets the Patient Profile tab as clicked during state transition
        $scope.var = 1;
    }
        
});
    
    //The purpose of this code is to change states on click and highlight the button based on the state.
    //This is a bit lazy but the scope of var won't be passed to other controllers so var wont be referenced in another
    //controller to change its value to update the button css will need to use a service later to inject scope variables
    //of PatientCtrl to the tabs ctrl.
    $scope.tabclickpatientinfo = function(){
    $state.go("main.patientprofile.information");
    $scope.var = 1;
    };
    $scope.tabclickpatientmedical = function(){
        $state.go("main.patientprofile.medicalinformation");
        $scope.var = 2;
    };        
    $scope.tabclickpatientdiagnosis = function(){
        $state.go("main.patientprofile.diagnosis");
        $scope.var = 3;
    }; 
        $scope.tabclickpatientcareteam= function(){
        $state.go("main.patientprofile.careteam");
        $scope.var = 4;
    };
    
    $scope.tabclickpatientvitals= function(){
        $state.go("main.patientprofile.vitals");
        $scope.var = 5;
    };
    

    
});

patientprofile.controller("alergiesCtrl", function($scope){
    
    
    $scope.data = {
    showDelete: false
  };
  

  
  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
  };
  
  $scope.onItemDelete = function(item) {
    $scope.items.splice($scope.items.indexOf(item), 1);
  };
  
  $scope.items = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
    { id: 13 },
    { id: 14 },
    { id: 15 }      
  ];


});


patientprofile.controller("medicationCtrl", function($scope){
    
    
    $scope.data = {
    showDelete: false
  };
  

  
  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
  };
  
  $scope.onItemDelete = function(item) {
    $scope.items.splice($scope.items.indexOf(item), 1);
  };
  
  $scope.items = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
    { id: 13 },
    { id: 14 },
    { id: 15 }      
  ];


});

patientprofile.controller("careteamCtrl", function($scope){
    
    
    $scope.data = {
    showDelete: false
  };
  

  
  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
  };
  
  $scope.onItemDelete = function(item) {
    $scope.items.splice($scope.items.indexOf(item), 1);
  };
  
  $scope.items = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
    { id: 13 },
    { id: 14 },
    { id: 15 }      
  ];


});



