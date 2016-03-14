var main = angular.module('mainlayout');


main.service('MainService', function($q, $http,$stateParams) {
    
var defer,
mainMethods = {
    UpdateStatusPromise: function(statusObject){
        var doctorinfo = $stateParams.doctorid;
        var statusid = statusObject.statusid;
        var doctorid = doctorinfo.doctorID;
        var doctorFirstName = doctorinfo.firstName;
        var doctorLastName = doctorinfo.lastName;
        var doctorSpeciality = doctorinfo.specialty;
        
        var doctorData = {doctorID:doctorid, firstName: doctorFirstName,
                         lastName: doctorLastName, specialty:doctorSpeciality, status: statusObject.docstatus,
                         version:statusObject.version};
        
        
        var promise = $http.put('http://localhost:8080/Medroid/doctorstatuses/'+ statusid, doctorData),
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
    
    GetStatusPromise: function(){
        var doctorinfo = $stateParams.doctorid;
        var doctorid = doctorinfo.doctorID;
    
        
        var promise = $http.get('http://localhost:8080/Medroid/doctors/'+ doctorid),
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
    
    
    return mainMethods;
        
      
});