(function() {
    'use strict';

    angular
        .module('test')
        .controller('singupController', singupController);

    singupController.$inject = ['authService'];

    /* @ngInject */
    function singupController(authService) {
        var vm = this;

    }
})();
