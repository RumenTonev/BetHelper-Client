'use strict';

betHelper.factory('GamesResource', ['$resource', 'baseServiceUrl', function($resource,baseServiceUrl) {

    var GamesResource = $resource(baseServiceUrl + '/api/Games/:action/:id', null, {
        'demo': { method: 'POST', params: {action:'Demo' }, isArray: false },
        'public': {  method: 'GET', params: {action:'GetAllForToday' }, isArray: true },
        'publicFull': {  method: 'GET', params: {action:'GetAllForTodayFullModel' }, isArray: true },
        'byId': { method: 'GET', params: { id: '@id',action:'GetSingle' }, isArray: false }

    });

    return {
        demo: function() {
            return GamesResource.demo();
        },
        public: function() {
            return GamesResource.public();
        },
        publicFull: function() {
            return GamesResource.publicFull();
        },
        byId: function(id) {
            return GamesResource.byId({id: id});
        }
    }
}]);