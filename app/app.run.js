(function() {
    angular.module('test')
        .run(runBlock);

    runBlock.$inject = ['$rootScope', '$state', '$stateParams'];

    function runBlock($rootScope, $state, $stateParams) {
        if (localStorage.getItem('token')) {
          $http.defaults.headers.common.Authorization = localStorage['Token'];
        }
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            $rootScope.currentState = toState;
            if (localStorage.getItem('token')) {
              $http.defaults.headers.common.Authorization = localStorage['Token'];
            }
        });
        $rootScope.$on('$viewContentLoaded', function() {

        });

    }
}());
