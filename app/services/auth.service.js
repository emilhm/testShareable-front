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
            singin: singin
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
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    deferred.resolve(data);
                })
                .error(function(status) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }

        function logout() {
            var deferred = $q.defer();
            $http({
                    url: BaseApiUrl + '/logout/',
                    method: "post",
                    params: payload
                })
                .success(function(data, status, headers, config) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    deferred.resolve(data);
                })
                .error(function(status) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }

        function singin() {
            console.log('singin');
        }
    }
})();
