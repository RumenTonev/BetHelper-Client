'use strict';

betHelper.factory("clientPushHubService", ["hubProxy", "$q","serverUrl", function (hubProxy, $q,serverUrl) {
    var deferred = $q.defer();

    var hub = hubProxy(serverUrl, "currentGameInfoHub");
    hub.on("notifyLinkMainPage");
    hub.on("pushTeamData");
    hub.start()
        .done(function () {
            deferred.resolve(hub);
        })
        .fail(function () {
            deferred.reject(hub);
        });

    return deferred.promise;
}]);


