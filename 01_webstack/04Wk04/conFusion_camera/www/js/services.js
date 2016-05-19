'use strict';

angular.module('conFusion.services', ['ngResource'])
    .constant("baseURL", "http://192.168.0.102:3000/")
    .factory('menuFactory', ['$resource', 'baseURL', function($resource, baseURL) {
        return $resource(baseURL + "dishes/:id", null, {
            'update': {
                method: 'PUT'
            }
        });
    }])

.factory('promotionFactory', ['$resource', 'baseURL', function($resource, baseURL) {
    return $resource(baseURL + "promotions/:id");
}])

.factory('corporateFactory', ['$resource', 'baseURL', function($resource, baseURL) {
    return $resource(baseURL + "leadership/:id");

}])

.factory('feedbackFactory', ['$resource', 'baseURL', function($resource, baseURL) {
    return $resource(baseURL + "feedback/:id");

}])

/*
.factory('favoriteFactory', ['$resource', 'baseURL','$window',function($resource, baseURL,$window) {
    var favFac = {};

    // Initiliazing favorites with local storage key
    var favorites = JSON.parse($window.localStorage['favorites'] || '{}');

    favFac.addToFavorites = function(index) {
        for (var i = 0; i < favorites.length; i++) {
            if (favorites[i].id == index)
                return;
        }
        favorites.push({ id: index });

        // Updating and saving local storage key
        $window.localStorage['favorites'] = JSON.stringify(favorites);
    };

    favFac.deleteFromFavorites = function(index) {
        for (var i = 0; i < favorites.length; i++) {
            if (favorites[i].id == index) {
                favorites.splice(i, 1);
            }
        }

        // Updating and saving local storage key
        $window.localStorage['favorites'] = JSON.stringify(favorites);
    }

    favFac.getFavorites = function() {
        return favorites;
    };

    return favFac;
}])
*/

.factory('favoriteFactory', ['$localStorage', function ($localStorage ) {
    var favFac = {};
      
// Task 3.1: When the app first starts, the favorites information is initialized from local storage.
      
    var favorites = $localStorage.getObject('favorites','[]');

// Task 3.2: Whenever the favorites is updated due to user's actions, the updates are persisted in the local storage (on addition).
      
    favFac.addToFavorites = function (index) {
        for (var i = 0; i < favorites.length; i++) {
            if (favorites[i].id == index)
                return;
        }
        console.log('Adding the '+index+' id food to favorites');
        favorites.push({id: index});
        $localStorage.storeObject('favorites',favorites); 
    };

// Task 3.2: Whenever the favorites is updated due to user's actions, the updates are persisted in the local storage (on deletion).
      
    favFac.deleteFromFavorites = function (index) {
        for (var i = 0; i < favorites.length; i++) {
            if (favorites[i].id == index) {
                favorites.splice(i, 1);
            }
        }
        console.log('Deleting the '+index+' id favorite.');
        $localStorage.storeObject('favorites',favorites); 
    }

    favFac.getFavorites = function () {
        return favorites;
    };

    return favFac;
    }])


// Class exercise
.factory('$localStorage', ['$window', function($window) {
    return {
        store: function(key, value) {
            $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        storeObject: function(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key, defaultValue) {
            return JSON.parse($window.localStorage[key] || defaultValue);
        }
    }
}]);
