(function() {
  'use strict';

  angular
    .module('test')
    .controller('questionController', questionController);

  questionController.$inject = ['dataService', '$stateParams', '$state'];

  /* @ngInject */
  function questionController(dataService, $stateParams, $state) {
    var vm = this;
    vm.submit = submit;

    activate();

    function activate() {
      if (!$stateParams.id) {
        $state.go('home');
      }
      getQuestion();
      getAnswer();
    }

    function getQuestion() {
      dataService.getQuestion($stateParams.id).then(
        function(data) {
          vm.question = data;
        },
        function(err) {
          $rootScope.$emit('toastr:error',err.data.message);
        });
    };

    function getAnswer() {
      dataService.getAnswer($stateParams.id).then(
        function(data) {
          vm.answer = data;
        },
        function(err) {
          $rootScope.$emit('toastr:error',err.data.message);
        });
    };

    function submit() {
      var payload = {
        response: vm.answerForm,
        questions: $stateParams.id,
        user: 1
      };
      dataService.postAnswer(payload).then(
        function(resp) {
          vm.answerForm='';
          vm.answer.push(resp);
          vm.question.cantAnswer++;
        },
        function(err) {
          $rootScope.$emit('toastr:error',err.data.message);
        });

    }
  }
})();
