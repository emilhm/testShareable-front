(function() {
    'use strict';

    angular
        .module('test')
        .directive('headerDirective', headerDirective);

    /* @ngInject */
    function headerDirective() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/components/header/header.html',
            controller: headerController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    headerController.$inject = ['authService', '$state', '$rootScope'];

    /* @ngInject */
    function headerController(authService, $state, $rootScope) {
        var vm = this;
        vm.logout = logout;

        function logout() {
            authService.logout().then(function(data) {
                $state.go('login');
            }, function(err) {
                $rootScope.$emit('toastr:error', err.data.message);
            })
        }
    }
})();
