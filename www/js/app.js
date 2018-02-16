// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('shopMyTools', ['ionic', 'shopMyTools.controllers', 'shopMyTools.dashboardController','shopMyTools.homeController','shopMyTools.categoryPageController',
  'shopMyTools.services','shopMyTools.dashboardServices', 'shopMyTools.homeService','shopMyTools.categoryService', 'shopMyTools.constants','shopMyTools.smtdirective','720kb.tooltips'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'menuController'
      })


      .state('welcome', {
        url: '/welcome',
        cache: false,
        templateUrl: 'templates/welcome.html',
        controller: 'welcomeController'
      })


      .state('welcomeSlides', {
        url: '/welcomeSlides',
        cache: false,
        templateUrl: 'templates/welcomeSlides.html',
        controller: 'welcomeController'
      })

      .state('smtLogin', {
        url: '/smtLogin',
        cache: false,
        templateUrl: 'templates/smtLogin.html',
        controller: 'loginController'
      })

      .state('smt_registration', {
        url: '/smt_registration',
        cache: false,
        templateUrl: 'templates/smt_registration.html',
        controller: 'registrationController'
      })

      .state('forgotPassword', {
        url: '/forgotPassword',
        cache: false,
        templateUrl: 'templates/forgotPassword.html',
        controller: 'forgotPasswordCtrl'
      })

      .state('emailSent', {
        url: '/emailSent',
        cache: false,
        templateUrl: 'templates/emailSent.html',
        controller: 'forgotPasswordCtrl'
      })


      .state('app.invoiceOrders', {
        url: '/invoiceOrders',
        views: {
          'menuContent': {
            templateUrl: 'templates/invoiceOrders.html'
          }
        }
      })

      .state('app.myorders', {
        url: '/myorders',
        views: {
          'menuContent': {
            templateUrl: 'templates/myorders.html',
            controller: 'myOrderController'
          }
        }
      })
      .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/home.html',
            controller: 'homeController'
          }
        }
      })

      .state('categoryCartPage', {
        url: '/categoryCartPage',
        cache: false,
        templateUrl: 'templates/categoryCartPage.html',
        controller: 'categoryController'
      })

      .state('filterPageModal', {
        url: '/filterPageModal',
        cache: false,
        templateUrl: 'templates/filterPageModal.html',
        controller: 'filterController'
      })
      
      .state('whishlist_page', {
        url: '/whishlist_page',
        cache: false,
        templateUrl: 'templates/whishlist_page.html',
        //controller: 'welcomeController'
      })
      
      .state('productDetail_page', {
        url: '/productDetail_page',
        cache: false,
        templateUrl: 'templates/productDetail_page.html',
       // controller: 'welcomeController'
      });
      
      





    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/welcomeSlides');
  });
