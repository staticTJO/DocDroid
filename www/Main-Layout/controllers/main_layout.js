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
    

        $stateProvider
        .state('main.chat', {
          url: '/chat/:careteamid',
          templateUrl: './Chat/templates/chat.html',
        });


});
  

    


