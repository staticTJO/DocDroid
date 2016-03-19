/**
 * Author: Julien Popa-liesz
 *
 * --- Main Layout Module ---
 *
 * The Main state module declaration and routing info for
 * Child views of Main State
 * 
 */

angular.module('mainlayout', [])

.config(function($stateProvider, $urlRouterProvider){
      
    /*Child states of the main layout*/
    
      $stateProvider
        .state('main.dailyrounds', {
          url: '/dailyrounds/{doctorid:json}',
          templateUrl: './Daily-Rounds/templates/daily_rounds.html',
        });
        
       $stateProvider
        .state('main.patientprofile', {
          url: '/patientprofile/{patientid:json}',
          templateUrl: './Patient-Profile/templates/patient_profile.html',
        });
    


/*  // setup an abstract state for the tabs directive
    .state('main.tab', {
    url: '/tab',
    abstract: true,
    templateUrl: './Chat/templates/tabs.html'
  })*/

  // Each tab has its own nav history stack:
$stateProvider
  .state('main.chats', {
    url: '/chats/',
    templateUrl: './Chat/templates/tab-chats.html',
  });

/*  .state('main.tab.users', {
      url: '/users',
      views: {
        'tab-users': {
          templateUrl: './Chat/templates/tab-users.html',
        }
      }
    })*/

/*    .state('main.tab.list', {
      url: '/list',
      views: {
        'tab-list': {
          templateUrl: './Chat/templates/tab-list.html',
          controller: 'listCtrl'
        }
      }
    })*/
/*  
  .state('main.tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: './Chat/templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });*/




});
  

    


