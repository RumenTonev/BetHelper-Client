'use strict'
betHelper.directive('customPopover', function () {
    return {
        restrict: 'A',
        template: '<span class="legend-label">Click for Description<span>',
        link: function (scope, el, attrs) {
            scope.label = attrs.popoverLabel;

            $(el).popover({
                trigger: 'click',
                html: true,
                content: function() {
                    return $('#legend').html();
                },
                placement: attrs.popoverPlacement
            });
        }
    };
});

