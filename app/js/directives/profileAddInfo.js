'use strict'
betHelper.directive('customPopover', function () {
    return {
        restrict: 'A',
        template: 'views/directives/proflieAddInfo.html',
        link: function (scope, el, attrs) {
            scope.label = attrs.popoverLabel;

            $(el).popover({
                trigger: 'click',
                html: true,
                content: attrs.popoverHtml,
                placement: attrs.popoverPlacement
            });
        }
    };
});

