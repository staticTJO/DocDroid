angular.module('docdroid')
.run(['$rootScope', '$state', '$stateParams',
  function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}])



  
.config(function($stateProvider, $urlRouterProvider){
      
      $stateProvider
        .state('main', {
          url: '/',
          templateUrl: './Main-Layout/templates/main_layout.html',
        });

$urlRouterProvider.otherwise("/");

});