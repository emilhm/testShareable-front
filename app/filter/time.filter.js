(function() {
    'use strict';
    angular.module('test').filter('dateFormat', dateFormat);

    function dateFormat() {
        return function(time) {
            if (!time) return;

            return moment(time).calendar(null, {
                lastDay: '[Yesterday]',
                sameDay: 'LT',
                lastWeek: 'dddd',
                sameElse: 'DD/MM/YY'
            });
        }
    }
}());
