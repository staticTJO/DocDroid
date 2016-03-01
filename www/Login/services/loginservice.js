var login = angular.module('login');

login.service('LoginService', function($q, $http) {
    
var defer,
LoginMethods = {
    getLoginPromise: function(){
        
        var promise = $http.get('http://localhost:8080/Medroid/loguserdoctors'),
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