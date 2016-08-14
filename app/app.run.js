(function() {
    angular.module('test')
        .run(runBlock);

    runBlock.$inject = ['$rootScope', '$state', '$stateParams'];

    function runBlock($rootScope, $state, $stateParams) {

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            $rootScope.currentState = toState;
        });
        $rootScope.$on('$viewContentLoaded', function() {

        });

    }
}());
