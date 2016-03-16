var login = angular.module('dailyrounds');

login.service('DailyRoundsService', function($q, $http,$state,$stateParams) {
    
 
var DailyRoundsMethods = {
    getDoctorId: function(){
        return $stateParams.doctorid;   
    },
    
    getPatients: function(){
    var doctorData = $stateParams.doctorid;
    var doctorid = doctorData.doctorID;
    var promise = $http.get('http://69.11.16.153/Medroid/jsondoctorpatients/GetPatientsByDoctorID/' + doctorid),
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
    
   dischargePatientPromise: function(careteamid){
        var careteamID = careteamid;
        var promise = $http.delete('http://69.11.16.153/Medroid/careteams/' + careteamID),
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
    
    getPatientStatus: function(){
    var promise = $http.get('http://69.11.16.153/Medroid/patientstatuses/'),
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
    return DailyRoundsMethods;
        
      
});