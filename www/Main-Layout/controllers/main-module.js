angular.module('docdroid', ['ionic'])
.run(['$rootScope', '$state', '$stateParams',
  function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}])



  
.config(function($stateProvider, $urlRouterProvider){
      
      $stateProvider
        .state('main', {
          url: '/',
          templateUrl: './templates/main_layout.html',
        });

$urlRouterProvider.otherwise( function($injector, $location) {
            var $state = $injector.get("$state");
            $state.go("main");
        });
});

//docdroid.controller('passMomCtrl', function($scope,$state){
//    
//    $scope.passmommy = function(){
//        
//        $state.go("main2",{yourmom: 'In Your Mom'});      
//    };
//});





//docdroid.controller('demoCtrl',['$scope','$state','$location',function($scope,$state,$location){
//
//    $scope.isState = function(states){
//      return $state.includes(states);
//    };  
//}]);
    


