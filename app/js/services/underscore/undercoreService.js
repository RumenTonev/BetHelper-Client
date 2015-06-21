/**
 * Created by rumen on 3/25/2015.
 */
var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
    return window._; //Underscore must already be loaded on the page
});

