'use strict';

var betHelper = angular.module('betHelper', ['ngRoute', 'ngResource', 'ngCookies', 'tt.SignalR','myModal','ui.bootstrap','underscore']).
    config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        $httpProvider.interceptors.push('errorHandlerHttpInterceptor');

        var routeUserChecks = {
            authenticated: {
                authenticate: function(auth) {
                    return auth.isAuthenticated();
                }
            }
        };

        $routeProvider
            .when('/', {
                templateUrl: 'views/partials/home.html',
                controller: 'HomeCtrl'
            })
            .when('/unauthorized', {
                templateUrl: 'views/partials/unauthorized.html',
                controller: 'HomeCtrl'
            })
            .when('/register', {
                templateUrl: 'views/partials/register.html',
                controller: 'SignUpCtrl'
            })
            .when('/admin', {
                templateUrl: 'views/partials/admin.html',
                controller: 'AdminCtrl',
                resolve: routeUserChecks.authenticated
            })
            .when('/games', {
                templateUrl: 'views/partials/games.html',
                controller: 'GamesCtrl'
            })
            .when('/games/:id', {
                templateUrl: 'views/partials/games-details.html',
                controller: 'GamesDetailsCtrl'

            })
            .when('/teams', {
                templateUrl: 'views/partials/teams.html',
                controller: 'TeamsCtrl'

            })
            .when('/teams/:id', {
                templateUrl: 'views/partials/team-details.html',
                controller: 'TeamDetailsCtrl'

            })
            .otherwise({ redirectTo: '/' });
    }])
    .run(function($rootScope, $location,clientPushHubService) {
        $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
            if (rejection === 'not authorized') {
                $location.path('/unauthorized');
            }
        })
        $rootScope.signalrNot = false;
        $rootScope.playersT=false;

    })
    .value('toastr', toastr)
	.constant('baseServiceUrl','http://bethelperfr.azurewebsites.net/')
// .constant('baseServiceUrl','http://localhost:23610/')
// betHelper.value('signalRServer', 'http://localhost:23610/');
betHelper.value('signalRServer', 'http://bethelperfr.azurewebsites.net/');

