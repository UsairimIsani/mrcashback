// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['starter.controllers','ui.router'])

.constant('AzureMobileServiceClient', {
        API_URL: "https://mrcash2.azure-mobile.net/",
        API_KEY: 'tHJbrrAycKlzONaCEpKFtkYAToDuwl50'
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('dashboard', { 
      url: '/dashboard',
          templateUrl: 'templates/dashboard.html',
          controller: 'DashboardCtrl as vm'
    })
    .state('login', {
      url: '/login',
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl as vm'
    })
    .state('signup', {
      url: '/signup',
          templateUrl: 'templates/signup.html',
          controller: 'LoginCtrl as vm'
    })
    // .state('admin', {
    //   url: '/admin',
    //       templateUrl: 'templates/admin.html',
    //       controller: 'AdminCtrl as vm'
    // })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
