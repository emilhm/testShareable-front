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

    questionController.$inject = ['dataService', '$rootScope', '$uibModal'];

    /* @ngInject */
    function questionController(dataService, $rootScope, $uibModal) {
        var vm = this;
        vm.openModalQuestion = openModalQuestion;
        vm.deleteQuestion = deleteQuestion;
        vm.user = JSON.parse(localStorage.getItem('user'));

        function openModalQuestion(size, data) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/modalQuestion/modalQuestion.html',
                controller: 'modalQuestionController',
                controllerAs: 'vm',
                size: size,
                resolve: {
                    data: function() {
                        return data;
                    }
                }
            });
        };

        function deleteQuestion(id) {
            var payload = {
                'id': id
            }
            dataService.deleteQuestion(payload).then(
                function(resp) {
                    $rootScope.$emit('toastr:success', 'success');
                    $rootScope.$emit('$reload');
                },
                function(err) {
                    $rootScope.$emit('toastr:error', err.data.message);
                });
        }
    }
})();
