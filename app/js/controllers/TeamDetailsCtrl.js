'use strict'
betHelper.controller('TeamDetailsCtrl', ['$rootScope', '$scope', '$filter', '$routeParams', 'TeamsResource', 'myCache', 'modalService',
    'ProfilesResource', 'notifier', 'identity', '_',
    function TeamDetailsCtrl($rootScope, $scope, $filter, $routeParams, TeamsResource, myCache, modalService, ProfilesResource, notifier, identity, underscore) {
        if (!angular.element('.container ').hasClass('table-left-class')) {

            angular.element('.container ').addClass('table-left-class');
        }
        $scope.isRT = true;


        $scope.viewLoading = true;

        TeamsResource.byId($routeParams.id)
            .$promise
            .then(function (teamProfile) {

                $scope.profileModel = teamProfile;

                $rootScope.playersT = true;
                $scope.viewLoading = false;
            });
        $rootScope.playersT = false;
        $scope.profileHover = function (profile) {
            // Shows/hides the delete button on hover
            var modalOptions = {
                closeButtonText: 'Close',
                actionButtonText: 'OK',
                headerText: 'Proceed?',
                profile: profile
            };

            modalService.showModal({}, modalOptions).then(function (result) {

            });
        };

        $scope.profileChangeView = function (profile, clickEvent) {
            profile.visibilityMode = !profile.visibilityMode;
        };
        $scope.changeInput = function (profile) {
            profile.visibilityMode = !profile.visibilityMode;
            ProfilesResource.updateCurrentFormLevel(profile.teamGameProfileId, profile.currentFormLevel);
        }

        $scope.changeInputComment = function (profile) {
            profile.visibilityMode = !profile.visibilityMode;
            ProfilesResource.updateCurrentFormDetails(profile.teamGameProfileId, profile.currentFormDetails);
        }

        $scope.profileSelect = function (profile, clickEvent) {
            profile.isMileStone = !profile.isMileStone;

            function nextMileStone(profileInner) {
                return profileInner.teamGameProfileId > profile.teamGameProfileId && profileInner.isMileStone;
            }

            var activityLimitator = underscore.filter($scope.profileModel.teamGameProfiles, nextMileStone);


            var currentPlyeIds = profile.playersIds;

            function playerprofi(player) {
                return currentPlyeIds.indexOf(player.playerId) > -1;
            }

            //players-titulars
            var profiPlayers = underscore.filter($scope.profileModel.players, playerprofi);

            function activityto(activity) {

                return activity.ps > profile.sh && ( activity.minutesPlayes.startsWith("N")
                    || activity.minutesPlayes.startsWith("r") || activity.minutesPlayes.startsWith("^") || activity.minutesPlayes.startsWith("v"));
            }

            for (var i = 0; i < profiPlayers.length; i++) {
                var currentActivities = underscore.filter(profiPlayers[i].activities, activityto);

                for (var k = 0; k < currentActivities.length; k++) {
                    currentActivities[k].isKeyMiss = profile.isMileStone;
                }

            }
            if (angular.element('.sc' + profile.teamGameProfileId).hasClass('greenClass')) {
                angular.element('.sc' + profile.teamGameProfileId).removeClass('greenClass');
            }
            else {
                angular.element('.sc' + profile.teamGameProfileId).addClass('greenClass');
            }
            ProfilesResource.updateMileStone(profile.teamGameProfileId);
        };
        $scope.colorClick = false;
        $scope.activityClick = function (clickEvent) {
            // Shows/hides the delete button on hover
            console.log(clickEvent.currentTarget);

            var mycolor = clickEvent.currentTarget.bgColor;

            if (mycolor === "") {
                clickEvent.currentTarget.bgColor = 'yellow';
            }
            else if (mycolor === 'yellow') {
                clickEvent.currentTarget.bgColor = '';
            }
        };
    }]);
/**
 * Created by rumen on 12/13/2014.
 */
