(function() {

  angular.module('test')
    .config(appConfig);

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function appConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home/:category',
        views: {
          "main": {
            controller: 'homeController',
            controllerAs: 'vm',
            templateUrl: 'app/home/home.html'
          }
        }
      })
      .state('question', {
        url: '/question/:id',
        views: {
          "main": {
            controller: 'questionController',
            controllerAs: 'vm',
            templateUrl: 'app/question/question.html'
          }
        }
      })
      .state('login', {
        url: '/login',
        views: {
          "main": {
            controller: 'loginController',
            controllerAs: 'vm',
            templateUrl: 'app/login/login.html'
          }
        }
      })
      .state('singup', {
        url: '/singup',
        views: {
          "main": {
            controller: 'singupController',
            controllerAs: 'vm',
            templateUrl: 'app/singup/singup.html'
          }
        }
      });

    $urlRouterProvider.otherwise('/home/');
  }
})();
