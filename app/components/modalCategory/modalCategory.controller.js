(function() {
    'use strict';

    angular
        .module('test')
        .controller('modalCategoryController', modalCategoryController);

    modalCategoryController.$inject = ['dataService'];

    /* @ngInject */
    function modalCategoryController(dataService) {
        var vm = this;

    }
})();
