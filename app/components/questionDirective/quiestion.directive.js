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
        vm.likeQuestion = likeQuestion;
        vm.isLike = isLike;
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

        function isLike(idQuestion) {
          var payload = {
            'question': idQuestion,
            'user': vm.user.id
          };
          dataService.getLikes(payload).then(
              function(resp) {
                if (resp[0]) {
                  vm.question.isLike = resp[0].like;
                }
              },
              function(err) {
                  $rootScope.$emit('toastr:error', err.data.message);
              });
        };

        function likeQuestion(idQuestion) {
          var payload = {
            'question': idQuestion,
            'user': vm.user.id
          };
          dataService.postLikes(payload).then(
              function(resp) {
                  $rootScope.$emit('toastr:success', 'success');
                  $rootScope.$emit('$reload');
              },
              function(err) {
                  $rootScope.$emit('toastr:error', err.data.message);
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
