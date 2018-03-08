// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('shopMyTools', ['ionic', 'shopMyTools.controllers', 'shopMyTools.dashboardController',
  'shopMyTools.homeController', 'shopMyTools.categoryPageController',
  'shopMyTools.productDetailPageController', 'shopMyTools.ckeckoutController',
  'shopMyTools.services',
  'shopMyTools.dashboardServices', 'ngCordova', 'shopMyTools.homeService',
  'shopMyTools.categoryService', 'shopMyTools.productDetailPageService',
  'shopMyTools.ckeckoutSerivce', 'shopMyTools.constants', 'shopMyTools.smtdirective',
  '720kb.tooltips', 'ionic-ratings', 'shopMyTools.paymentsuccess'])

  .run(function ($ionicPlatform, $state, $cordovaNetwork, $rootScope, $ionicPopup) {
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


      // this.network.onchange().subscribe((change) => {
      //   if (change.type == "offline") {
      //     this.tostOffline = this.toastCtrl.create({
      //       message: 'No internet connection, Reconnect and try again'
      //     });
      //     this.tostOffline.present();
      //     if (this.tostOnline !== undefined) {
      //       this.tostOnline.dismiss();
      //     }
      //   }

      //   if (change.type == "online") {
      //     console.log(this.network.type)
      //     alert(this.network.type);
      //     this.tostOnline = this.toastCtrl.create({
      //       message: 'Internet connection is back',
      //       duration: 3000
      //     });
      //     this.tostOnline.present();
      //     if (this.tostOffline !== undefined) {
      //       this.tostOffline.dismiss();
      //     }
      //   }
      // });


      // $rootScope.checkConnection = function () {
      //   $rootScope.isOnline = $cordovaNetwork.isOnline();
      //   $rootScope.$apply();
      //   alert( $rootScope.isOnline)
      // }
      // $rootScope.checkConnection();

      // $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
      //   alert('Net');
      //   $ionicPopup.alert({
      //     template: 'Please Check Network Connection',
      //     title: 'Error!'
      //   });
      // });

      // $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
      //   alert('Net');
      // });


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
        templateUrl: 'templates/payu.html'
      })

      .state('success', {
        url: '/success',
        templateUrl: 'templates/success.html',
        controller: 'paymentsuccessCntrl'
      })
      .state('editUserProfile', {
        url: '/editUserProfile',
        cache: false,
        templateUrl: 'templates/editUserProfile.html',
        controller: 'editProfileCntrl'
      })

      .state('myOrdersFilter_page', {
        url: '/myOrdersFilter_page',
        cache: false,
        templateUrl: 'templates/myOrdersFilter_page.html',
        controller: 'myOrderController'
      })

      .state('cancelOrders_page', {
        url: '/cancelOrders_page',
        cache: false,
        templateUrl: 'templates/cancelOrders_page.html',
        controller: 'myOrderController'
      })

      .state('invoiceOrders_page', {
        url: '/invoiceOrders_page',
        cache: false,
        templateUrl: 'templates/invoiceOrders_page.html',
        controller: 'myOrderController'
      })

      .state('headerSearchbar', {
        url: '/headerSearchbar',
        cache: false,
        templateUrl: 'templates/headerSearchbar.html',
        controller: 'searchController'
      });



    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/welcomeSlides');
  });
