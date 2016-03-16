var login = angular.module('login');

login.service('LoginService', function($q, $http) {
    
var defer,
LoginMethods = {
    getLoginPromise: function(){
        
        var promise = $http.get('http://69.11.16.153/Medroid/loguserdoctors'),
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
    }
    
      
};
    return LoginMethods;
        
      
});