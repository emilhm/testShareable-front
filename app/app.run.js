(function() {
  angular.module('test')
    .run(runBlock);

  runBlock.$inject = ['$rootScope', '$state', '$http', '$stateParams', 'toastr'];

  function runBlock($rootScope, $state, $http, $stateParams, toastr) {
    if (localStorage.getItem('token')) {
      var token = localStorage.getItem('token')
      $http.defaults.headers.common['Authorization'] = token;
    }
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      $rootScope.currentState = toState;
      if (localStorage.getItem('token')) {
        var token = localStorage.getItem('token')
        $http.defaults.headers.common['Authorization'] = token;
      }
    });
    $rootScope.$on('$viewContentLoaded', function() {

    });

    $rootScope.$on('toastr:error', function(event, error) {
      if (angular.isObject(error)) {
        angular.forEach(error, function(value, key) {
          if (angular.isArray(value)) {
            for (var i = value.length - 1; i >= 0; i--) {
              toastr.error(value[i], 'Error')
            }
          } else {
            toastr.error(value, 'Error')
          }
        });
      } else
        toastr.error(error, 'Error');
    })

    $rootScope.$on('toastr:success', function(event, success) {
      toastr.success(success, 'Success');
    });

    $rootScope.$on('toastr:warning', function(event, warning) {
      toastr.warning(warning, 'Warning');
    });

    $rootScope.$on('toastr:info', function(event, info) {
      toastr.info(info, 'Info');
    });


  }
}());
