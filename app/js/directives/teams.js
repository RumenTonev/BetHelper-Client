'use strict';

betHelper.directive('teams', [function() {
    return {
        restrict: 'A',
        templateUrl: 'views/directives/teams.html',
        scope: true,
        replace: true
    }
}]);