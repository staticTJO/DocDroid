var patientdiagnosis = angular.module('patientprofile');

patientdiagnosis.service('PatientDiagnosisService', function($q, $http,$state,$stateParams) {
    
var defer,
PatientDiagnosisMethods = {
    getPatientDiagnosisPromise: function(){
    var patientData = $stateParams.patientid;
    var patientID = patientData.patientID;
        
        var promise = $http.get('http://localhost:8080/Medroid/jsonpatientdiagnosis/GetDiagnosisPatientID/' + patientID),
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
    
    deletePatientDiagnosisPromise: function(diagnosisid){
        var DiagnosisID = diagnosisid;
        var promise = $http.delete('http://localhost:8080/Medroid/doctordiagnoses/' + DiagnosisID),
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
    
    addPatientDiagnosisPromise: function(diagnosisData){
        var promise = $http.post('http://localhost:8080/Medroid/doctordiagnoses',diagnosisData),
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
      
};
    return PatientDiagnosisMethods;
        
      
});