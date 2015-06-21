/**
 * Created by rumen on 11/26/2014.
 */
'use strict';

betHelper.factory('playersSignalRValuesUtilizer', [ function() {
    var headers = {};

    return {
        setCurrentNewPlayers: function(currentPassedNewPlayers,profile) {
            profile.newPlayers=currentPassedNewPlayers;
        },
        setCurrentPlayersTimePlayed: function(currentPassedOldPlayers,allPlayers) {
            angular.forEach(allPlayers,function(player,key){
                for (var i = 0; i < currentPassedOldPlayers.length; i++) {
                    if (currentPassedOldPlayers[i].playerId === player.playerId){
                        player.currentActivity.minutesPlayes=currentPassedOldPlayers[i].minutesPlayes;
                            currentPassedOldPlayers.splice(i, 1);
                        return;
                    }
                }
                })
        }

    }
}]);
