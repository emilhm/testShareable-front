(function() {
    'use strict'

    angular.module('test').
    factory('interceptorsService', interceptorsService);

    interceptorsService.$inject = ['$q', '$rootScope'];

    function interceptorsService($q, $rootScope) {
        var sessionInjector = {
            'request': function(config) {
                return config;
            },
            'response': function(response) {
                return response;
            },
            'responseError': function(rejection) {
                if (rejection.status === 401) {
                    $rootScope.$broadcast('unauthenticate');
                    window.location.href = "/#/login";
                }
                return $q.reject(rejection);
            },
            'requestError': function(rejection) {
                return $q.reject(rejection);
            }
        }

        return sessionInjector;
    }
})();
