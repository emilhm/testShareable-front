(function() {
    'use strict';

    angular
        .module('test')
        .controller('questionController', questionController);

    questionController.$inject = ['dataService', '$stateParams', '$state', '$rootScope'];

    /* @ngInject */
    function questionController(dataService, $stateParams, $state, $rootScope) {
        var vm = this;
        vm.submit = submit;
        vm.ratingAnswer = ratingAnswer;
        vm.user = JSON.parse(localStorage.getItem('user'));

        activate();

        function activate() {
            if (!$stateParams.id) {
                $state.go('home');
            }
            getQuestion();
            getAnswer();
        }

        function ratingAnswer(answer, vote) {
            var payload = {
                'answer': answer,
                'user': vm.user.id,
                'vote': vote
            };
            dataService.postRating(payload).then(
                function(resp) {
                    $rootScope.$emit('toastr:success', 'success');
                    $rootScope.$emit('$reload');
                },
                function(err) {
                    $rootScope.$emit('toastr:error', err.data.message);
                });
        };

        function getQuestion() {
            dataService.getQuestion($stateParams.id).then(
                function(data) {
                    vm.question = data[0];
                },
                function(err) {
                    $rootScope.$emit('toastr:error', err.data.message);
                });
        };

        function getRating(id, index) {
            dataService.getRating(id).then(
                function(data) {
                    vm.answer[index].rating = data;
                    if(data.voteUser != undefined)
                    {
                      vm.answer[index].vote = data.voteUser;
                    }
                },
                function(err) {
                    $rootScope.$emit('toastr:error', err.data.message);
                }
            );
        }

        function getAnswer() {
            dataService.getAnswer($stateParams.id).then(
                function(response) {
                    vm.answer = response;
                    for (var i = vm.answer.length - 1; i >= 0; i--) {
                        getRating(vm.answer[i].id, i);
                    }
                },
                function(err) {
                    $rootScope.$emit('toastr:error', err.data.message);
                });
        };

        function submit() {
            var payload = {
                response: vm.answerForm,
                questions: $stateParams.id,
                user: vm.user.id
            };
            dataService.postAnswer(payload).then(
                function(resp) {
                    vm.answerForm = '';
                    vm.answer.push(resp);
                    vm.question.cantAnswer++;
                },
                function(err) {
                    $rootScope.$emit('toastr:error', err.data.message);
                });
        }
    }
})();
