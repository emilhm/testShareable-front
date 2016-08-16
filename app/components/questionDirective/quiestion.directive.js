(function() {
    'use strict';

    angular
        .module('test')
        .directive('questionDirective', questionDirective);

    /* @ngInject */
    function questionDirective() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/components/questionDirective/questionDirective.html',
            scope: {
              question: '=',
              details: '='
            },
            controller: questionController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    questionController.$inject = [];

    /* @ngInject */
    function questionController() {
        var vm = this;

    }
})();
