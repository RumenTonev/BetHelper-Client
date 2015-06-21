'use strict';

betHelper.controller('HomeCtrl', ['$rootScope','$scope','$filter','GamesResource','subscribePrefix','myCache','TeamsResource','playersSignalRValuesUtilizer',
    function HomeCtrl($rootScope,$scope, $filter,GamesResource,subscribePrefix,myCache,TeamsResource,playersSignalRValuesUtilizer) {
        var cacheCurrentGames = myCache.get('currentGames');
        $rootScope.playersT=true;
        if (cacheCurrentGames) {
            $scope.games = cacheCurrentGames;
        }
        else {
            GamesResource.publicFull()
                .$promise
                .then(function (games) {
                    $scope.games = games;
                    myCache.put('currentGames', $scope.games);
                   // $rootScope.playersT=true;

                });
        }
        $scope.demoClick = function() {
           GamesResource.demo();


        };
        $scope.$on(subscribePrefix + "notifyLinkMainPage", function (evt, data) {
            console.log(data);
            var currentPushedGame= $filter('filter')($scope.games, {gameId:  data.GameId})[0];
            $scope.homeProfileModel=currentPushedGame.hostModel;
            $scope.guestProfileModel=currentPushedGame.guestModel;
            currentPushedGame.status="NowPlayed";
            playersSignalRValuesUtilizer.setCurrentPlayersTimePlayed(data.CurrentPassedHomeOldPlayers, $scope.homeProfileModel.players);
            playersSignalRValuesUtilizer.setCurrentPlayersTimePlayed(data.CurrentPassedAwayOldPlayers, $scope.guestProfileModel.players);
            playersSignalRValuesUtilizer.setCurrentNewPlayers(data.CurrentPassedHomeNewPlayers, $scope.homeProfileModel);
            playersSignalRValuesUtilizer.setCurrentNewPlayers(data.CurrentPassedAwayNewPlayers, $scope.guestProfileModel);
            if(myCache.get('currentGames')) {
                myCache.remove('currentGames');
            }
            myCache.put('currentGames',  $scope.games);

        });
    }]);