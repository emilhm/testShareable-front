(function() {
    'use strict';

    angular
        .module('test')
        .controller('loginController', loginController);

    loginController.$inject = ['authService', '$state'];

    /* @ngInject */
    function loginController(authService, $state) {
        var vm = this;
        vm.login = login;

        function login() {
            authService.login(vm.user).then(
              function (data) {
                $state.go('home');
              },
              function (err) {
                console.log(err);
              }
            )
        }
    }
})();
