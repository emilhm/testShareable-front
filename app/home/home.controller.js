(function() {
    'use strict';

    angular
        .module('test')
        .controller('homeController', homeController);

    homeController.$inject = ['dataService', '$stateParams', '$rootScope', '$uibModal'];

    /* @ngInject */
    function homeController(dataService, $stateParams, $rootScope, $uibModal) {
        var vm = this;
        vm.openModalQuestion = openModalQuestion;
        vm.openModalCategory = openModalCategory;

        activate();

        function activate() {
            $stateParams.category ? getQuestionByCategory() : getQuestions();
            getCategory();
        }

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

        function openModalCategory(size) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/modalCategory/modalCategory.html',
                controller: 'modalCategoryController',
                controllerAs: 'vm',
                size: size
            });
        };

        function getQuestions() {
            dataService.getQuestions().then(
                function(data) {
                    vm.questions = data;
                },
                function(err) {
                    $rootScope.$emit('toastr:error', err.data.message);
                }
            )
        };

        function getQuestionByCategory() {
            dataService.getQuestionByCategory($stateParams.category).then(
                function(data) {
                    vm.questions = data;
                },
                function(err) {
                    $rootScope.$emit('toastr:error', err.data.message);
                }
            )
        }

        function getCategory() {
            dataService.getCategory().then(
                function(data) {
                    vm.categorys = data;
                },
                function(err) {
                    $rootScope.$emit('toastr:error', err.data.message);
                }
            )
        };
    }
})();
