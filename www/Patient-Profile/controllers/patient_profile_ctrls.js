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

$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) { 
    
 /*Initialized the info state inside the patient profile state*/
    if(toState.name == 'main.patientprofile') {
        $state.go("main.patientprofile.information");
        // Sets the Patient Profile tab as clicked during state transition
        $scope.var = 1;
        
    $scope.patientData = $stateParams.patientid;
        
    // Set Patient Data
    $scope.firstName = $scope.patientData.firstName;
    $scope.lastName = $scope.patientData.lastName;
    $scope.middleName = $scope.patientData.middleName;
    $scope.pid = $scope.patientData.patientID;
    $scope.hc = $scope.patientData.HC;
    $scope.sex = $scope.patientData.sex;
    $scope.age = $scope.patientData.age;
    $scope.city = $scope.patientData.city;
    $scope.prov = $scope.patientData.prov;
    $scope.bloodtype = $scope.patientData.bloodtype;
    $scope.birthdate = $scope.patientData.DOB;
    $scope.symptomDesc = $scope.patientData.symptomDesc;
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

patientprofile.controller("alergiesCtrl", function($scope,$state,$stateParams,$ionicPopup,PatientProfileService){

    $scope.patientData = $stateParams.patientid;
    $scope.patientID = $scope.patientData.patientID;
    
    $scope.onSuccess = false;
    $scope.error = false;
    
    var Alergydata;
    
    var getAlergyPromise = PatientProfileService.getAlergyPromise();
    
    getAlergyPromise.then(
    //On Success function
    function(data){
        $scope.onSuccess = true;
        $scope.Alergydata = data.data;
        $scope.alergies = [];
    for(var i = 0; i < $scope.Alergydata.length; i++){
            if( $scope.patientID == $scope.Alergydata[i].patient.patientID){
            $scope.alergies.push({alergy: $scope.Alergydata[i].allergy});
            }
        }
        
    },
    
    //On Failure function
        function(reason){
        $scope.somethingwrong = reason;
        $scope.error = true;
    if($scope.error === true){
            var Serverdown = $ionicPopup.alert({
                title: 'Error Occured!',
                template: 'Could not load patient Alergies!'
                });     
            }
        }
    
    );
    
    $scope.data = {
    showDelete: false
  };
  
});


patientprofile.controller("medicationCtrl",function($scope,$state,$stateParams,$ionicPopup,PatientProfileService){

    $scope.patientData = $stateParams.patientid;
    $scope.patientID = $scope.patientData.patientID;
    
    $scope.onSuccess = false;
    $scope.error = false;
    
    var Medicationdata;
    
    var getMedicationPromise = PatientProfileService. getMedicationPromise();
    
   getMedicationPromise.then(
    //On Success function
    function(data){
        $scope.onSuccess = true;
        $scope.Medicationdata = data.data;
        $scope.medications = [];
    for(var i = 0; i < $scope.Medicationdata.length; i++){
            if( $scope.patientID == $scope.Medicationdata[i].patient.patientID){
            $scope.medications.push({medication: $scope.Medicationdata[i].medication});
            }
        }
        
    },
    
    //On Failure function
        function(reason){
        $scope.somethingwrong = reason;
        $scope.error = true;
    if($scope.error === true){
            var Serverdown = $ionicPopup.alert({
                title: 'Error Occured!',
                template: 'Could not load patient medications!'
                });     
            }
        }
    
    );
    
    $scope.data = {
    showDelete: false
  };

});

patientprofile.controller("careteamCtrl", function($scope,$state,$stateParams,PatientProfileService,$ionicPopup){
    
    $scope.patientData = $stateParams.patientid;
    $scope.patientID = $scope.patientData.patientID;
    
    $scope.onSuccess = false;
    $scope.error = false;
    
    var Careteamdata;
    
    var getCareteamPromise = PatientProfileService.getCareteamPromise();
    
    getCareteamPromise.then(
    //On Success function
    function(data){
        $scope.onSuccess = true;
        $scope.Careteamdata = data.data;
        $scope.careteams = [];
    for(var i = 0; i < $scope.Careteamdata.length; i++){
            $scope.careteams.push({doctorID: $scope.Careteamdata[i].doctorID,
                                 lastName:$scope.Careteamdata[i].lastName,
                                 firstName:$scope.Careteamdata[i].firstName,
                                 specialty:$scope.Careteamdata[i].specialty});
        }
        
    },
    
    //On Failure function
        function(reason){
        $scope.somethingwrong = reason;
        $scope.error = true;
    if($scope.error === true){
            var Serverdown = $ionicPopup.alert({
                title: 'Error Occured!',
                template: 'Could not load patient careteam!'
                });     
            }
        }
    
    );
    
    $scope.data = {
    showDelete: false
  };


});


patientprofile.controller("diagnosisCtrl", function($scope,$state,$stateParams,PatientProfileService,$ionicPopup){
    
  $scope.data = {
    showDelete: false
  };
  
  $scope.edit = function(item) {
  
  };
  $scope.share = function(item) {

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
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
    { id: 13 },
    { id: 14 },
    { id: 15 },
    { id: 16 },
    { id: 17 },
    { id: 18 },
    { id: 19 },
    { id: 20 },
    { id: 21 },
    { id: 22 },
    { id: 23 },
    { id: 24 },
    { id: 25 },
    { id: 26 },
    { id: 27 },
    { id: 28 },
    { id: 29 },
    { id: 30 },
    { id: 31 },
    { id: 32 },
    { id: 33 },
    { id: 34 },
    { id: 35 },
    { id: 36 },
    { id: 37 },
    { id: 38 },
    { id: 39 },
    { id: 40 },
    { id: 41 },
    { id: 42 },
    { id: 43 },
    { id: 44 },
    { id: 45 },
    { id: 46 },
    { id: 47 },
    { id: 48 },
    { id: 49 },
    { id: 50 }
  ];    
    
});



