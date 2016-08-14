(function() {

  angular.module('test')
    .config(appConfig);

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function appConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/:category',
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
      });

    $urlRouterProvider.otherwise('/');
  }
})();
