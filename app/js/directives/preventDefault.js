/**
 * Created by rumen on 6/19/2015.
 */
'use strict';

betHelper.directive('preventDefault', function() {
    return function(scope, element, attrs) {
        angular.element(element).bind('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
        });
    }
});
