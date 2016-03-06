var dailyrounds = angular.module('dailyrounds');

dailyrounds.controller("DailyRoundsCtrl", function($scope,$state,DailyRoundsService, $ionicPopup){
    
$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) { 
    
// Initialized Patient Id on state change
    if(toState.name == 'main.dailyrounds') {
        
    $scope.onSuccess = false;
    $scope.error = false;
    
    var getPatientPromise = DailyRoundsService.getPatients();
    
    getPatientPromise.then(
    //On Success function
    function(data){
        $scope.onSuccess = true;
        $scope.patientData = data.data;
        $scope.patients = [];
        
        for(var i = 0; $scope.patientData.length; i++){
            $scope.patients.push({patientID: $scope.patientData[i].patientID, firstName: $scope.patientData[i].firstName,
                                 lastName: $scope.patientData[i].lastName, status: $scope.patientData[i].status});
        }
    },
    
    //On Failure function
    function(reason){
        $scope.somethingwrong = reason;
        $scope.error = true;
            if($scope.error === true){
                    var Serverdown = $ionicPopup.alert({
                    title: 'Error Occured!',
                    template: 'Patients could not be loaded'
                });     
            }
         }
    
        );      
}
           
});
    
 $scope.shouldShowDelete = false;
 $scope.shouldShowReorder = false;
 $scope.listCanSwipe = true;
        
    $scope.gotopatient = function(patientID){
        var patientInfo;
        for(var i = 0; i < $scope.patientData.length; i++){
            if(patientID == $scope.patientData[i].patientID){
                patientInfo = $scope.patientData[i];
            }
        }
        $state.go("main.patientprofile", {patientid: patientInfo});
        
    };
    
    $scope.data = {
        showDelete: false
    };
  
  $scope.edit = function(item) {
  };
    
 $scope.share = function(item) {
  };
  
  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.patients.splice(fromIndex, 1);
    $scope.patients.splice(toIndex, 0, item);
  };
  
  $scope.onItemDelete = function(patient) {
    $scope.patients.splice($scope.patients.indexOf(patient), 1);
  };

});