'use strict';

betHelper.directive('players', [function() {
    return {
        restrict: "A",
            replace: true,
            scope: true,
            link: function(scope, elements, attrs) {
            try {
                scope.obj = JSON.parse(attrs.obj);
            } catch (e) {
                scope.$watch(function() {
                    return scope.$parent.$eval(attrs.obj);
                }, function(newValue, oldValue) {
                    scope.obj = newValue;
                });
            }
        },
      templateUrl: 'views/directives/players.html'

    };


}]);