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
          url: '/dailyrounds',
          templateUrl: './Daily-Rounds/templates/daily_rounds.html',
        });
        
       $stateProvider
        .state('main.patientprofile', {
          url: '/patientprofile/:patientid',
          templateUrl: './Patient-Profile/templates/patient_profile.html',
        });

});
  

    


