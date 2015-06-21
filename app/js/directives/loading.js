'use strict'

betHelper.directive('shaLoading', function() {
    'use strict';

    return {
        restrict: 'A',
        replace: true,
        transclude: true,
        scope: {
            loading: '=shaLoading'
        },
        templateUrl: 'views/directives/loading.html',
        link: function(scope, element, attrs) {
            var spinner = new Spinner().spin();
            var loadingContainer = element.find('.sha-loading-spinner-container')[0];
            loadingContainer.appendChild(spinner.el);
        }
    };
});/**
 * Created by rumen on 6/15/2015.
 */


