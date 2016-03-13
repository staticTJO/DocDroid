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
        $scope.careteamData = data.data;
        $scope.patients = [];
        
        for(var i = 0; $scope.careteamData.length; i++){
            $scope.patients.push({careteamID: $scope.careteamData[i].id, patientID: $scope.careteamData[i].patient.id,        
                                  firstName:$scope.careteamData[i].patient.firstName,
                                  lastName: $scope.careteamData[i].patient.lastName, 
                                  status: $scope.careteamData[i].patient.status});
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
        for(var i = 0; i < $scope.careteamData.length; i++){
            if(patientID == $scope.careteamData[i].patient.patientID){
                patientInfo = $scope.careteamData[i].patient;
            }
        }
        $state.go("main.patientprofile", {patientid: patientInfo});
        
    };
    
    $scope.data = {
        showDelete: false
    };
    
  $scope.onItemDelete = function(patient) {
      
    var dischargePatientPromise = DailyRoundsService.dischargePatientPromise(patient.careteamID);
    
   dischargePatientPromise.then(
    //On Success function
    function(data){
        $scope.onSuccess = true;
        $scope.Deletedata = data.data;
        $scope.patients.splice($scope.patients.indexOf(patient), 1);
    },
    
    //On Failure function
        function(reason){
        $scope.somethingwrong = reason;
        $scope.error = true;
    if($scope.error === true){
            var Serverdown = $ionicPopup.alert({
                title: 'Error Occured!',
                template: 'Could not discharge Patient!'
                });     
            }
        }
    
    );  
  };

  $scope.moveItem = function(patient, fromIndex, toIndex) {
    $scope.patients.splice(fromIndex, 1);
    $scope.patients.splice(toIndex, 0, patient);
  };
  

});