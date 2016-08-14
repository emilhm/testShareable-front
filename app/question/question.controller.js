(function() {
    'use strict';

    angular
        .module('test')
        .controller('questionController', questionController);

    questionController.$inject = ['dataService', '$stateParams', '$state'];

    /* @ngInject */
    function questionController(dataService,$stateParams, $state) {
        var vm = this;

        activate();

        function activate() {
          if (!$stateParams.id) {
            $state.go('home');
          }
          getQuestion();
        }

        function getQuestion(){
          dataService.getQuestion($stateParams.id).then(
            function (data) {
              vm.question = data;
            },
            function (err) {
              console.log(err);
            }
          )
        };
    }
})();
