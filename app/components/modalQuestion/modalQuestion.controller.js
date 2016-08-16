(function() {
    'use strict';

    angular
        .module('test')
        .controller('modalQuestionController', modalQuestionController);

    modalQuestionController.$inject = ['dataService', 'data', '$uibModalInstance', '$rootScope'];

    /* @ngInject */
    function modalQuestionController(dataService, data, $uibModalInstance, $rootScope) {
        var vm = this;
        vm.submit = submit;
        vm.close = close;
        getCategory();
        if (data) {
            vm.payload = {};
            vm.payload.id = data.id;
            vm.payload.question = data.question;
            vm.payload.message = data.message;
            vm.payload.user = data.user.id;
            vm.payload.category = '1';
        }

        vm.user = JSON.parse(localStorage.getItem('user'));

        function close() {
            $uibModalInstance.dismiss('cancel');
        }

        function getCategory() {
            dataService.getCategory().then(
                function(data) {
                    vm.categoryData = data;
                },
                function(err) {
                    $rootScope.$emit('toastr:error', err.data.message);
                }
            )
        };

        function postQuestion(payload) {
            payload.user = vm.user.id;
            dataService.postQuestion(payload).then(
                function(resp) {
                    $rootScope.$emit('$reload');
                    close();
                },
                function(err) {
                    $rootScope.$emit('toastr:error', err.data.message);
                });
        }
        function updateQuestion(payload) {
            dataService.updateQuestion(payload).then(
                function(resp) {
                    $rootScope.$emit('$reload');
                    close();
                },
                function(err) {
                    $rootScope.$emit('toastr:error', err.data.message);
                });
        }

        function submit() {
          data ? updateQuestion(vm.payload): postQuestion(vm.payload);
        }
    }
})();
