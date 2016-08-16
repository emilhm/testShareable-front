(function() {
  'use strict';

  angular
    .module('test')
    .controller('loginController', loginController);

  loginController.$inject = ['authService', '$state','$rootScope'];

  /* @ngInject */
  function loginController(authService, $state, $rootScope) {
    var vm = this;
    vm.login = login;

    function login() {
      authService.login(vm.user).then(
        function(data) {
          $state.go('home');
        },
        function(err) {
          $rootScope.$emit('toastr:error',err.data.message)
        }
      )
    }
  }
})();
