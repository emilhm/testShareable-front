(function() {
  'use strict';

  angular
    .module('test')
    .service('dataService', dataService);

  dataService.$inject = ['$http', '$q', 'BaseApiUrl'];

  /* @ngInject */
  function dataService($http, $q, BaseApiUrl) {

    var dataService = {
      getQuestions: getQuestions,
      getQuestion: getQuestion,
      getCategory: getCategory,
      getQuestionByCategory: getQuestionByCategory,
      postAnswer: postAnswer,
      postQuestion: postQuestion,
      deleteQuestion: deleteQuestion,
      updateQuestion: updateQuestion,
      getAnswer: getAnswer,
      getRating: getRating
    };

    return dataService;

    function getQuestion(id) {
      var deferred = $q.defer();
      $http({
        url: BaseApiUrl + '/questions/',
        method: "GET",
        params: {
          'id': id
        }
      }).then(function(data) {
          deferred.resolve(data.data);
        },function(err) {
          deferred.reject(err);
        });
      return deferred.promise;
    }

    function getQuestionByCategory(category) {
      var deferred = $q.defer();
      $http({
        url: BaseApiUrl + '/questions/',
        method: "GET",
        params: {
          'category': category
        }
      })
        .then(function(data) {
          deferred.resolve(data.data);
        },function(err) {
          deferred.reject(err);
        });
      return deferred.promise;
    }

    function getQuestions() {
      var deferred = $q.defer();
      $http.get(BaseApiUrl + '/questions/')
        .then(function(data) {
          deferred.resolve(data.data);
        },function(err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    function getCategory() {
      var deferred = $q.defer();
      $http.get(BaseApiUrl + '/category/')
        .then(function(data) {
          deferred.resolve(data.data);
        },function(err) {
          deferred.reject(err);
        });
      return deferred.promise;
    }

    function postAnswer(payload) {
      var deferred = $q.defer();
      $http({
        url: BaseApiUrl + '/response/',
        method: "post",
        params: payload
      }).then(function(data) {
          deferred.resolve(data.data);
        },function(err) {
          deferred.reject(err);
        });
      return deferred.promise;
    }

    function postQuestion(payload) {
      var deferred = $q.defer();
      $http({
        url: BaseApiUrl + '/questions/',
        method: "post",
        params: payload
      }).then(function(data) {
          deferred.resolve(data.data);
        },function(err) {
          deferred.reject(err);
        });
      return deferred.promise;
    }

    function updateQuestion(payload) {
      var deferred = $q.defer();
      $http({
        url: BaseApiUrl + '/questions/'+payload.id,
        method: "PUT",
        params: payload
      }).then(function(data) {
          deferred.resolve(data.data);
        },function(err) {
          deferred.reject(err);
        });
      return deferred.promise;
    }

    function deleteQuestion(payload) {
      var deferred = $q.defer();
      $http({
        url: BaseApiUrl + '/questions/',
        method: "delete",
        params: payload
      }).then(function(data) {
          deferred.resolve(data.data);
        },function(err) {
          deferred.reject(err);
        });
      return deferred.promise;
    }

    function getAnswer(questions) {
      var deferred = $q.defer();
      var payload = {
        'questions': questions
      }
      $http({
        url: BaseApiUrl + '/response/',
        method: "get",
        params: payload
      }).then(function(data) {
          deferred.resolve(data.data);
        },function(err) {
          deferred.reject(err);
        });
      return deferred.promise;
    }
    function getRating(id) {
      var deferred = $q.defer();
      $http({
        url: BaseApiUrl + '/rating/'+id+'/',
        method: "get"
      }).then(function(data) {
          deferred.resolve(data.data);
        },function(err) {
          deferred.reject(err);
        });
      return deferred.promise;
    }
  }
})();
