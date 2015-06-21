'use strict'
betHelper.controller('GamesDetailsCtrl', ['$scope', '$filter', '$rootScope', '$routeParams', 'GamesResource',
    'playersSignalRValuesUtilizer', 'subscribePrefix', 'myCache', 'modalService', 'ProfilesResource', 'identity',
    function GamesDetailsCtrl($scope, $filter, $rootScope, $routeParams, GamesResource, playersSignalRValuesUtilizer
        , subscribePrefix, myCache, modalService, ProfilesResource, identity) {

        var cacheCurrentGames = myCache.get('currentGames');
        $rootScope.playersT = true;
        if (cacheCurrentGames) {
            $scope.games = cacheCurrentGames;
            var currentPushedGame = $filter('filter')($scope.games, {gameId: $routeParams.id})[0];
            $scope.homeProfileModel = currentPushedGame.hostModel;
            for (var i = 0; i < $scope.homeProfileModel.teamGameProfiles.length; i++) {
                $scope['sc' + $scope.homeProfileModel.teamGameProfiles[i].teamGameProfileId] = false;
            }
            $scope.guestProfileModel = currentPushedGame.guestModel;
            for (var i = 0; i < $scope.guestProfileModel.teamGameProfiles.length; i++) {
                $scope['sc' + $scope.guestProfileModel.teamGameProfiles[i].teamGameProfileId] = false;
            }
            $rootScope.playersT = true;
        }
        else {
            GamesResource.publicFull()
                .$promise
                .then(function (games) {
                    $scope.games = games;
                    myCache.put('currentGames', $scope.games);
                    var currentPushedGame = $filter('filter')($scope.games, {gameId: $routeParams.id})[0];
                    $scope.homeProfileModel = currentPushedGame.hostModel;
                    var profilesIn = $scope.homeProfileModel.teamGameProfiles;
                    for (var i = 0; i < profilesIn.length; i++) {
                        $scope['sc' + profilesIn[i].teamGameProfileId] = false;
                    }
                    $scope.guestProfileModel = currentPushedGame.guestModel;
                    var profilesOut = $scope.guestProfileModel.teamGameProfiles;
                    for (var i = 0; i < profilesOut.length; i++) {

                    }
                    $rootScope.playersT = true;
                });
        }
        if (!cacheCurrentGames) {
            $rootScope.playersT = false;
        }

        $scope.profileSelect = function (profile, clickEvent) {
            if (angular.element('.sc' + profile.teamGameProfileId).hasClass('greenClass')) {
                angular.element('.sc' + profile.teamGameProfileId).removeClass('greenClass');
            }
            else {
                angular.element('.sc' + profile.teamGameProfileId).addClass('greenClass');
            }
            ProfilesResource.updateMileStone(profile.teamGameProfileId);


        };

        $scope.profileHover = function (profile) {
            var modalOptions = {
                closeButtonText: 'Close',
                actionButtonText: 'OK',
                headerText: 'Proceed?',
                profile: profile
            };
            modalService.showModal({}, modalOptions).then(function (result) {
            });
        };


        $scope.colorClick = false;
        $scope.demoClick = function () {
            GamesResource.demo();
        };
        $scope.activityClick = function (clickEvent) {
            var mycolor = clickEvent.currentTarget.bgColor;
            if (mycolor === "") {
                clickEvent.currentTarget.bgColor = 'yellow';
            }
            else if (mycolor === 'yellow') {
                clickEvent.currentTarget.bgColor = '';
            }
        };
        $scope.$on(subscribePrefix + "pushTeamData", function (evt, data) {
            var currentPushedGame = $filter('filter')($scope.games, {gameId: data.GameId})[0];
            currentPushedGame.status = "NowPlayed";
            playersSignalRValuesUtilizer.setCurrentPlayersTimePlayed(data.CurrentPassedHomeOldPlayers, $scope.homeProfileModel.players);
            playersSignalRValuesUtilizer.setCurrentPlayersTimePlayed(data.CurrentPassedAwayOldPlayers, $scope.guestProfileModel.players);
            playersSignalRValuesUtilizer.setCurrentNewPlayers(data.CurrentPassedHomeNewPlayers, $scope.homeProfileModel);
            playersSignalRValuesUtilizer.setCurrentNewPlayers(data.CurrentPassedAwayNewPlayers, $scope.guestProfileModel);

            if (myCache.get('currentGames')) {
                myCache.remove('currentGames');
            }
            myCache.put('currentGames', $scope.games);
        });

    }]);