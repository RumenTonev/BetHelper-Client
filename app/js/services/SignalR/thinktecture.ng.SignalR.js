
// version 0.1

angular.module("tt.SignalR", ["ng"]).value("subscribePrefix", "tt.signalr:subscribe").value("serverUrl",'http://bethelpertrial.azurewebsites.net/');

angular.module("tt.SignalR").factory("hubProxy", ["$rootScope", "subscribePrefix","serverUrl", function ($rootScope, subscribePrefix,serverUrl) {
    function signalRHubProxyFactory(serverUrl, hubName) {
        var connection = $.hubConnection(serverUrl);
connection.disconnected(function () {
    $rootScope.signalrNot=true;
    $rootScope.$apply();
    console.log('We are currently experiencing difficulties with the connection.')
});
        connection.logging = true;
        var proxy = connection.createHubProxy(hubName);

        return {
            start: function (startOptions) {
                return connection.start(startOptions);
            },
            stop: function () {
                connection.stop();
                proxy = null;
            },
            on: function (eventName) {
                proxy.on(eventName, function (data) {
                    $rootScope.$apply(function () {
                        $rootScope.$broadcast(subscribePrefix + eventName, data);
                    });
                });
            },
            off: function (eventName) {
                proxy.off(eventName);
            },
            invoke: function () {
                var len = arguments.length;
                var args = Array.prototype.slice.call(arguments);
                var callback = undefined;

                if (len > 1) {
                    callback = args.pop();
                }

                proxy.invoke.apply(proxy, args)
                    .done(function (result) {
                        if (callback) {
                            $rootScope.$apply(function () {
                                callback(result);
                            });
                        }
                    });
            },
            connection: connection
        };
    };

    return signalRHubProxyFactory;
}]);
