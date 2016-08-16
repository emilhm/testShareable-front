(function() {
    'use strict';

    angular
        .module('test')
        .controller('modalCategoryController', modalCategoryController);

    modalCategoryController.$inject = ['dataService', '$rootScope', '$uibModalInstance'];

    /* @ngInject */
    function modalCategoryController(dataService, $rootScope, $uibModalInstance) {
        var vm = this;
        vm.submit = submit;
        function close() {
            $uibModalInstance.dismiss('cancel');
        }
        function submit() {
            dataService.postCategory(vm.payload).then(
                function(resp) {
                    $rootScope.$emit('$reload');
                    close();
                },
                function(err) {
                    $rootScope.$emit('toastr:error', err.data.message);
                });
        }
    }
})();
