var login = angular.module('login');


/**
 * Author: Julien Popa-liesz
 *
 * --- Login Controller ---
 *
 * Controller Login Functionality
 * 
 * 
 */

login.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    
    $scope.onSuccess = false;
    $scope.error = false;
    
    var logindata;
    
    var getLoginPromise = LoginService.getLoginPromise();
    
    getLoginPromise.then(
    //On Success function
    function(data){
        $scope.onSuccess = true;
        logindata = data.data;
    },
    
    //On Failure function
    function(reason){
        $scope.somethingwrong = reason;
        $scope.error = true;
    if($scope.error === true){
        var Serverdown = $ionicPopup.alert({
                title: 'Error Occured!',
                template: 'Server Down!'
            });     
        }
         }
    
        );
        
    
  $scope.authorization = {
    username: '',
    password : ''   
  };  
  
  $scope.signIn = function(form) {
      var boolLogin = false;
      var count;
      for(var i =0; i < logindata.length; i++ ){
          
        if(form.$valid && $scope.authorization.username == logindata[i].username  && $scope.authorization.password ==     
           logindata[i].password) {
                $state.go("main",{doctorid: logindata[i].id});
                boolLogin = true;
                break;
                }
       if(count == logindata.length ){
                var LoginInvalid = $ionicPopup.alert({
                        title: 'Login',
                        template: 'Invalid Credentials'
                    });                    
        }
      count++;
  }
      
      if(boolLogin === false){
        var LoginFailed = $ionicPopup.alert({
                title: 'Login',
                template: 'Login Failed'
            });        
      }

      
      
  };  
    
    
});    
