(function() {
    'use strict';

    angular
        .module('test')
        .controller('homeController', homeController);

    homeController.$inject = ['dataService', '$stateParams'];

    /* @ngInject */
    function homeController(dataService, $stateParams) {
        var vm = this;

        activate();

        function activate() {
          $stateParams.category ? getQuestionByCategory():getQuestions();
          getCategory();
        }

        function getQuestions(){
          dataService.getQuestions().then(
            function (data) {
              vm.questions = data;
            },
            function (err) {
              $rootScope.$emit('toastr:error',err.data.message);
            }
          )
        };
        function getQuestionByCategory(){
          dataService.getQuestionByCategory($stateParams.category).then(
            function (data) {
              vm.questions = data;
            },
            function (err) {
              $rootScope.$emit('toastr:error',err.data.message);
            }
          )
        }
        function getCategory(){
          dataService.getCategory().then(
            function (data) {
              vm.categorys = data;
            },
            function (err) {
              $rootScope.$emit('toastr:error',err.data.message);
            }
          )
        };
    }
})();
