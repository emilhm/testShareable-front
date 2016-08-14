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

    headerController.$inject = [];

    /* @ngInject */
    function headerController() {
        var vm = this;

    }
})();
