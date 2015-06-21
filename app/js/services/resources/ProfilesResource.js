/**
 * Created by rumen on 2/15/2015.
 */
'use strict';

betHelper.factory('ProfilesResource', ['$resource', 'baseServiceUrl', function($resource,baseServiceUrl) {

    var ProfilesResource = $resource(baseServiceUrl + '/api/Profiles/:action/:id', null, {
        'updateMileStone': {  method: 'PUT', params: {id: '@id',action:'UpdateMilestone' }, isArray: false },
        'updateCurrentFormLevel': {  method: 'PUT', params: {id: '@id',newContent: '@newContent',action:'UpdateCurrentFormLevel' }, isArray: false },
        'updateCurrentFormDetails': {  method: 'PUT', params: {id: '@id',newContent: '@newContent',action:'UpdateCurrentFormDetails' }, isArray: false },
        'updateCurrentUndefinedValues': {  method: 'POST', params: {action:'UpdateUndefinedProfile' }, isArray: false },
        'updateDuplicateValues': {  method: 'POST', params: {action:'UpdateDuplicateProfile' }, isArray: false },
        'enterNewManager': {  method: 'PUT', params: {action:'UpdateManager' }, isArray: false },
        'enterNewGameStatus': {  method: 'PUT', params: {action:'UpdateGameStatus' }, isArray: false }
    });

    return {
         updateUndefinedProfile: function(profile) {
          return ProfilesResource.updateCurrentUndefinedValues(profile).$promise;
         },
        updateDuplicateProfile: function(profile) {
            return ProfilesResource.updateDuplicateValues(profile).$promise;
        },
        enterNewManager: function(profile) {
            return ProfilesResource.enterNewManager(profile).$promise;
        },
        updateMileStone: function(id) {
            return ProfilesResource.updateMileStone({id: id}).$promise;
        },
        updateCurrentFormLevel: function(id,newContent) {
            return ProfilesResource.updateCurrentFormLevel({id: id,newContent:newContent}).$promise;
        },
        updateCurrentFormDetails: function(id,newContent) {
            return ProfilesResource.updateCurrentFormDetails({id: id,newContent:newContent}).$promise;
        },
        submitNewGameStatus: function(profile) {
            return ProfilesResource.enterNewGameStatus(profile).$promise;
        }
    }
}]);