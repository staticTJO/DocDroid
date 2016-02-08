angular.module('patientprofile', ['ionic'])

.config(function($stateProvider, $urlRouterProvider){
      
   /* Child states of the Paitent Profile*/ 
        
       $stateProvider
        .state('main.patientprofile.information', {
          url: '/patientprofile/patientinformation',
          templateUrl: './Patient-Profile/templates/patient_information.html',
        });
    
        $stateProvider
        .state('main.patientprofile.medicalinformation', {
          url: '/patientprofile/patientinformation/medicalinfo',
          templateUrl: './Patient-Profile/templates/patient_medical_information.html',
        });
    
        $stateProvider
        .state('main.patientprofile.diagnosis', {
          url: '/patientprofile/patientinformation/diagnosis',
          templateUrl: './Patient-Profile/templates/patient_diagnosis.html',
        });
    
        $stateProvider
        .state('main.patientprofile.vitals', {
          url: '/patientprofile/patientinformation/livevitals',
          templateUrl: './Patient-Profile/templates/patient_vitals.html',
        });
    
        $stateProvider
        .state('main.patientprofile.careteam', {
          url: '/patientprofile/patientinformation/careteam',
          templateUrl: './Patient-Profile/templates/patient_careteam.html',
        });
    

});
