(function() {
  'use strict';

  angular
    .module('test')
    .service('authService', authService);

  authService.$inject = ['$http', '$q', 'BaseApiUrl'];

  /* @ngInject */
  function authService($http, $q, BaseApiUrl) {
    var authService = {
      login: login
    };

    return authService;

    function login(payload) {
      var deferred = $q.defer();
      $http({
          url: BaseApiUrl + '/login/',
          method: "post",
          params: payload
        })
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
