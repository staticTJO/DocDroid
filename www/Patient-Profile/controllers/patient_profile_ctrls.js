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

patientprofile.controller("PatientCtrl",function($scope,$state,$stateParams,PatientProfileService,$ionicPopup){

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
    $scope.estimatedDischargeDate = $scope.patientData.estimatedDischargeDate.estimatedDischargeDate;
    $scope.dischargeID = $scope.patientData.estimatedDischargeDate.id;
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
    
    
$scope._discharge = $scope.estimatedDischargeDate;
    
    $scope.discharge= {
        date: function(newDischarge){
            return arguments.length ? ($scope._discharge = newDischarge) : $scope._discharge;
        }
    };

    
    $scope.UpdatePatientDischargeDate = function(){

    var getCurrentVersion = PatientProfileService.GetDischargePromise();
    
    getCurrentVersion.then(
        //On Success function
        function(data){
            $scope.onSuccess = true;
            $scope.dischargeVersionData = data.data;
            $scope.DischargeVersion =  $scope.dischargeVersionData[0].version;
            
            
            
        $scope.dischargeData = {estimatedDischargeDate: $scope.discharge.date(),
                             id: $scope.dischargeID, patientID: $scope.pid,
                             version: $scope.DischargeVersion};
       var UpdateDischargePromise = PatientProfileService.UpdateDischargePromise($scope.dischargeData);
        
        UpdateDischargePromise.then(
            //On Success function
            function(data){
                $scope.onSuccess = true;
                $scope.DischargePromiseData = data.data;
                if($scope.onSuccess === true){
                    var Serverdown = $ionicPopup.alert({
                        title: 'Patient Discharge!',
                        template: 'Discharge Updated!'
                        });     
                    }
            },

            //On Failure function
                function(reason){
                $scope.somethingwrong = reason;
                $scope.error = true;
            if($scope.error === true){
                    var Serverdown = $ionicPopup.alert({
                        title: 'Error Occured!',
                        template: 'Could not update Patient discharge!'
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
                    template: 'Could not get current version of patient discharge date!'
                    });     
                }
            }

        ); 
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


patientprofile.controller("diagnosisCtrl", function($scope,$state,$stateParams,$ionicPopup,$timeout,PatientDiagnosisService){
    
$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) { 
    
 /*Initialized the info state inside the patient profile state*/
    if(toState.name == 'main.patientprofile.diagnosis') {
    $scope.patientDiagnosis = []; 
    $scope.patientData = $stateParams.patientid;
    $scope.patientID = $scope.patientData.patientID;
    
    $scope.onSuccess = false;
    $scope.error = false;
    
    var Diagnosisdata;
    
    var getPatientDiagnosisPromise = PatientDiagnosisService.getPatientDiagnosisPromise();
    
   getPatientDiagnosisPromise.then(
    //On Success function
    function(data){
        $scope.onSuccess = true;
        $scope.Diagnosisdata = data.data;
    for(var i = 0; i < $scope.Diagnosisdata.length; i++){
          if( $scope.patientID == $scope.Diagnosisdata[i].patient.patientID){
            $scope.patientDiagnosis.push({CareteamId: $scope.Diagnosisdata[i].id, Diagnosis: $scope.Diagnosisdata[i].diagnosis});
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
                template: 'Could not load patient diagnosises!'
                });     
            }
        }
    
    );  

    }
        
});    
    
      
      
$scope.addDiagnosis = function() {
    $scope.doctorData = $stateParams.doctorid;
    $scope.doctorid =$scope.doctorData.doctorID;
    $scope.patientData = $stateParams.patientid;
    $scope.patientid = $scope.patientData.patientID;
    $scope.diagnosisdata = {};

   // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
     template: '<input type="text" ng-model="diagnosisdata.diagnosis">',
     title: 'Enter a diagnosis',
     subTitle: '',
     scope: $scope,
     buttons: [
       { text: 'Cancel' },
       {
         text: '<b>Save</b>',
         type: 'button-positive',
         onTap: function(e) {
           if (!$scope.diagnosisdata.diagnosis) {
             e.preventDefault();
           } else {
             return $scope.diagnosisdata.diagnosis;
           }
         }
       },
     ]
   });
   myPopup.then(function(res) {
       $scope.resdiagnosis = res;
       
       if($scope.resdiagnosis.length !== 0){
           
        var patientdata = {
          id: $scope.patientid,
          version: "0"
        };
            
        var doctordata = {
          id: $scope.doctorid,
          version: "0"
        };
            
        $scope.diagnosisObj = {
				diagnosis : $scope.resdiagnosis,
				doctor : doctordata,
				patient : patientdata
		};
           
PatientDiagnosisService.addPatientDiagnosisPromise($scope.diagnosisObj);
           
    $scope.onSuccess = false;
    $scope.error = false;
    
        var Diagnosisdata;

        var getPatientDiagnosisPromise = PatientDiagnosisService.getPatientDiagnosisPromise();

       getPatientDiagnosisPromise.then(
        //On Success function
        function(data){
            $scope.onSuccess = true;
            $scope.Diagnosisdata = data.data;
            if($scope.Diagnosisdata.length === 1){
            $scope.patientDiagnosis.push({CareteamId: $scope.Diagnosisdata[0].id, Diagnosis: $scope.Diagnosisdata[0].diagnosis});
            }else{
            for(var i = $scope.Diagnosisdata.length-1; $scope.Diagnosisdata.length; i++){
            $scope.patientDiagnosis.push({CareteamId: $scope.Diagnosisdata[i].id, Diagnosis: $scope.Diagnosisdata[i].diagnosis});
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
                    template: 'Could not load patient diagnosises!'
                    });     
                }
            }

        ); 
      }
   });
    
};

$scope.removeDiagnosis = function(diagnosis) {

    var deletePatientDiagnosisPromise = PatientDiagnosisService.deletePatientDiagnosisPromise(diagnosis.CareteamId);
    
   deletePatientDiagnosisPromise.then(
    //On Success function
    function(data){
        $scope.onSuccess = true;
        $scope.Deletedata = data.data;
        $scope.patientDiagnosis.splice($scope.patientDiagnosis.indexOf(diagnosis), 1);
    },
    
    //On Failure function
        function(reason){
        $scope.somethingwrong = reason;
        $scope.error = true;
    if($scope.error === true){
            var Serverdown = $ionicPopup.alert({
                title: 'Error Occured!',
                template: 'Could not delete patient diagnosis!'
                });     
            }
        }
    
    );  
    
};
      
$scope.data = {
    showDelete: false
  };
    
});



