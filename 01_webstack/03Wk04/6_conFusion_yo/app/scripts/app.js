'use strict';

/**
 * @ngdoc overview
 * @name 6ConFusionYoApp
 * @description
 * # 6ConFusionYoApp
 *
 * Main module of the application.
 */
angular
  .module('6ConFusionYoApp', [
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
