// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('shopMyTools', ['ionic', 'ngCordova','shopMyTools.controllers', 'shopMyTools.dashboardController', 'shopMyTools.homeController', 'shopMyTools.categoryPageController', 'shopMyTools.productDetailPageController', 'shopMyTools.ckeckoutController',
  'shopMyTools.services', 'shopMyTools.dashboardServices', 'shopMyTools.homeService', 'shopMyTools.categoryService', 'shopMyTools.productDetailPageService', 'shopMyTools.ckeckoutSerivce', 'shopMyTools.constants', 'shopMyTools.smtdirective', '720kb.tooltips', 'ionic-ratings'])

  .run(function ($ionicPlatform, $state) {
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

      .state('app.home', {
        url: '/home',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/home.html',
            controller: 'homeController'
          }
        }
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


      .state('myorders', {
        url: '/myorders',
        cache: false,
        templateUrl: 'templates/myorders.html',
        controller: 'myOrderController'
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
        controller: 'wishListDetailsCntrl'
      })

      .state('productDetail_page', {
        url: '/productDetail_page',
        cache: false,
        templateUrl: 'templates/productDetail_page.html',
        controller: 'productDetailController'
      })

      .state('specifications_page', {
        url: '/specifications_page',
        cache: false,
        templateUrl: 'templates/specifications_page.html',
        controller: 'productDetailController'
      })

      .state('relatedProducts_page', {
        url: '/relatedProducts_page',
        cache: false,
        templateUrl: 'templates/relatedProducts_page.html',
        controller: 'productDetailController'
      })

      .state('upsellProducts_page', {
        url: '/upsellProducts_page',
        cache: false,
        templateUrl: 'templates/upsellProducts_page.html',
        controller: 'productDetailController'
      })

      .state('cart_page', {
        url: '/cart_page',
        cache: false,
        templateUrl: 'templates/cart_page.html',
        controller: 'viewCartItemsListCntrl'
      })

      .state('shipping&billing_page', {
        url: '/shipping&billing_page',
        cache: false,
        templateUrl: 'templates/shipping&billing_page.html',
        controller: 'ckeckoutCntrl'
      })

      .state('add_address_page', {
        url: '/add_address_page',
        cache: false,
        templateUrl: 'templates/add_address_page.html'
        // controller: 'welcomeController'
      })

      .state('changePassword', {
        url: '/changePassword',
        cache: false,
        templateUrl: 'templates/changePassword.html',
        controller: 'resetPasswordCntrl'
     })
     .state('search', {
      url: '/search',
      cache: false,
      templateUrl: 'templates/search.html',
      controller: 'searchController'
   })
      
      .state('payu', {
        url: '/payu',
        cache: false,
        templateUrl: 'templates/payu.html',
        controller: 'ckeckoutCntrl'
      })
      .state('editUserProfile', {
        url: '/editUserProfile',
        cache: false,
        templateUrl: 'templates/editUserProfile.html',
        controller: 'editProfileCntrl'
      });



    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/welcomeSlides');
  });
