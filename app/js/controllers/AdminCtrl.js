'use strict'
betHelper.controller('AdminCtrl', ['$location','$scope','ProfilesResource','notifier',
    function AdminCtrl($location,$scope, ProfilesResource,notifier ) {
        $scope.submitTheForm = function(profile) {
            ProfilesResource.updateUndefinedProfile(profile)
                .then(function() {
                    notifier.success('Profile updates successfully!!');
                    $location.path('/admin');
                });
        };
        $scope.submitDuplicateForm = function(profile) {
            ProfilesResource.updateDuplicateProfile(profile)
                .then(function() {
                    notifier.success('Profile updates successfully!!');
                    $location.path('/admin');
                });
        };
        $scope.submitManagerChange = function(profile) {
            ProfilesResource.enterNewManager(profile)
                .then(function() {
                    notifier.success('New manager updates successfully!!');
                    $location.path('/admin');
                });
        };
        $scope.submitGameStatusNew = function(profile) {
            ProfilesResource.submitNewGameStatus(profile)
                .then(function() {
                    notifier.success('New game date updates successfully!!');
                    $location.path('/admin');
                });
        };
		$scope.updatePlayerStatus = function(playerModel) {
            ProfilesResource.updatePlayerStatus(playerModel)
                .then(function() {
                    notifier.success('Player data updates successfully!!');
                    $location.path('/admin');
                });
        };
		

    }]);/**
 * Created by rumen on 12/13/2014.
 */
/**
 * Created by rumen on 3/1/2015.
 */
