// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.categories', {
    url: '/categories',
    views: {
      'menuContent': {
        templateUrl: 'templates/categories.html',
        controller: 'CategoryListCtrl'
      }
    }
  })
  .state('app.quiz', { // Center stage for playing
    url: '/quiz/:categoryID',
    views: {
      'menuContent': {
        templateUrl: 'templates/quiz.html',
        controller: 'QuizCtrl',
        resolve: {
          model: ['rpcClient', function (rpcClient) {
            return rpcClient.getQuestionSet().then(function (questions) {
              return {
                questions:questions
              };
            })
          }]
        }
      }
    }
  })
  .state('app.quiz-result', { // Center stage for playing
    url: '/quiz-result',
    views: {
      'menuContent': {
        templateUrl: 'templates/quiz-result.html'
      }
    }
  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/categories');
});
