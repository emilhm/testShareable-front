(function() {
  'use strict';

  angular
    .module('test')
    .controller('singupController', singupController);

  singupController.$inject = ['authService', '$state', '$rootScope'];

  /* @ngInject */
  function singupController(authService, $state, $rootScope) {
    var vm = this;
    vm.singup = singup;

    function singup() {
      authService.singup(vm.user).then(
        function(resp) {
          $state.go('home');
        },
        function(err) {
          $rootScope.$emit('toastr:error', err.data.message);
        }
      )
    }

  }
})();
