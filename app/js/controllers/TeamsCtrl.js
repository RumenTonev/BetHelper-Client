'use strict';

betHelper.controller('TeamsCtrl', ['$scope','$filter','subscribePrefix','myCache','TeamsResource','playersSignalRValuesUtilizer',
    function TeamsCtrl($scope, $filter,subscribePrefix,myCache,TeamsResource,playersSignalRValuesUtilizer) {
        $scope.viewLoading = true;
            TeamsResource.all()
                .$promise
                .then(function (teams) {
                    $scope.teams = teams;
                    $scope.viewLoading = false;
                });
    }]);