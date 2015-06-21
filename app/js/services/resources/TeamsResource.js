'use strict'
betHelper.factory('TeamsResource', ['$resource',  'baseServiceUrl', function($resource, baseServiceUrl) {

    var TeamsResource = $resource(baseServiceUrl + '/api/Teams/:action/:id', null, {
        'publicFull': {  method: 'GET', params: {action:'GetAllTeams' }, isArray: true },
        'byId': { method: 'GET', params: { id: '@id',action:'GetSingle' }, isArray: false }
    });
    return {

        all: function() {
            return TeamsResource.publicFull();
        },
        byId: function(id) {

            return TeamsResource.byId({id: id});
        }
    }
}]);