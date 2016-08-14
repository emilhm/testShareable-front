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
      getQuestionByCategory: getQuestionByCategory
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
      })
        .success(function(data, status, headers, config) {
          deferred.resolve(data);
        })
        .error(function(status) {
          deferred.reject(status);
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
        .success(function(data, status, headers, config) {
          deferred.resolve(data);
        })
        .error(function(status) {
          deferred.reject(status);
        });
      return deferred.promise;
    }

    function getQuestions() {
      var deferred = $q.defer();
      $http.get(BaseApiUrl + '/questions/')
        .success(function(data, status, headers, config) {
          deferred.resolve(data);
        })
        .error(function(status) {
          deferred.reject(status);
        });
      return deferred.promise;
    }

    function getCategory() {
      var deferred = $q.defer();
      $http.get(BaseApiUrl + '/category/')
        .success(function(data, status, headers, config) {
          deferred.resolve(data);
        })
        .error(function(status) {
          deferred.reject(status);
        });
      return deferred.promise;
    }
  }
})();
