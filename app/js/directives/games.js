'use strict';

betHelper.directive('games', [function() {
    return {
        restrict: 'A',
        templateUrl: 'views/directives/games.html',
        scope: true,
        replace: true
    }
}]);