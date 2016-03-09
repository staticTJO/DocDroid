var patientprofile = angular.module('patientprofile');

patientprofile.service('PatientProfileService', function($q, $http,$state,$stateParams) {
    
var defer,
PatientProfileMethods = {
    getAlergyPromise: function(){
        
        var promise = $http.get('http://localhost:8080/Medroid/patientallergieses'),
        defer = defer || $q.defer();
        
        promise.then(
        
        //On Success
        function(data){
            defer.resolve(data);
        },
        
        //On Failure
        function(data){
            defer.reject(data);    
        });
        
        return defer.promise;
    },
    
    getMedicationPromise: function(){
        
        var promise = $http.get('http://localhost:8080/Medroid/patientmedicationses'),
        defer = defer || $q.defer();
        
        promise.then(
        
        //On Success
        function(data){
            defer.resolve(data);
        },
        
        //On Failure
        function(data){
            defer.reject(data);    
        });
        
        return defer.promise;
    },
    
    getCareteamPromise: function(){
    var patientData = $stateParams.patientid;
    var patientID = patientData.patientID;
        
        var promise = $http.get('http://localhost:8080/Medroid/jsonpatientdoctors/GetDoctorsByPatientID/' + patientID),
        defer = defer || $q.defer();
        
        promise.then(
        
        //On Success
        function(data){
            defer.resolve(data);
        },
        
        //On Failure
        function(data){
            defer.reject(data);    
        });
        
        return defer.promise;
    },
    
    addDiagnosis: function(diagnosis){

    }
      
};
    return PatientProfileMethods;
        
      
});