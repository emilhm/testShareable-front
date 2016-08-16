(function() {
  'use strict';

  angular
    .module('test')
    .service('authService', authService);

  authService.$inject = ['$http', '$q', 'BaseApiUrl'];

  /* @ngInject */
  function authService($http, $q, BaseApiUrl) {
    var authService = {
      login: login,
      logout: logout,
      singup: singup
    };

    return authService;

    function login(payload) {
      var deferred = $q.defer();
      $http({
          url: BaseApiUrl + '/login/',
          method: "post",
          params: payload
        })
        .then(
          function(response) {
            localStorage.setItem("token", response.data.user.token);
            localStorage.setItem("user", JSON.stringify(response.data.user.user));
            deferred.resolve(response);
          },
          function(err) {
            deferred.reject(err);
          }
        );
      return deferred.promise;
    }

    function logout() {
      var deferred = $q.defer();
      $http({
          url: BaseApiUrl + '/logout/',
          method: "post",
        })
        .then(
          function(response) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            deferred.resolve(response);
          },
          function(err) {
            deferred.reject(err);
          });
      return deferred.promise;
    }

    function singup(payload) {
      var deferred = $q.defer();
      $http({
          url: BaseApiUrl + '/singup/',
          method: "post",
          params: payload
        })
        .then(
          function(response) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify({
              'email': response.data.email,
              'id': response.data.id
            }));
            deferred.resolve(response);
          },
          function(err) {
            deferred.reject(err);
          }
        );
      return deferred.promise;
    }
  }
})();
