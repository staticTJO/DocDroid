/**
 * Author: Julien Popa-liesz
 *
 * --- Docdroid Main Routing Module ---
 *
 * The App module declaration 
 * Setting $state and $stateParams to the $rootScope so that it can be accessed 
 * from any scope within the applications. 
 * Example: <li ng-class="{ active: $state.includes('contacts.list') }"> 
 * will set the <li> to active whenever 
 * 'contacts.list' or one of its decendents is active.
 */

angular.module('docdroid')
.run(['$rootScope', '$state', '$stateParams',
  function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    
    if(toState.name == 'main') {
       $state.go("main.dailyrounds",{doctorid:$stateParams.doctorid});
    }
});
}])


  
.config(function($stateProvider, $urlRouterProvider){
      
      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: './Login/templates/login.html',
        });
    
      $stateProvider
        .state('main', {
          url: '/main/{doctorid:json}',
          templateUrl: './Main-Layout/templates/main_layout.html',
        });

$urlRouterProvider.otherwise("/login");

});