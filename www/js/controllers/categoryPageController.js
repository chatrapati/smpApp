angular.module('shopMyTools.categoryPageController', [])

  .controller('categoryController', function ($scope, $state, $rootScope, categoryService, $ionicModal, $ionicHistory) {

    $scope.getProductCategories = function (fromVal, toVal) {
      $scope.getCategoryProductData = {};
      $scope.getCategoryProductData.category = window.localStorage['categoryName'];
      $scope.getCategoryProductData.subcategory = [""];
      $scope.getCategoryProductData.from = 0;
      $scope.getCategoryProductData.to = 12
      $scope.loading = true;
      categoryService.getAllCategoriesOfProduct($scope, $rootScope).then(function (data) {
        $scope.loading = false;
        if (data.data) {

          $scope.products = data.data.products;
          $scope.subcategoriesList = data.data.subcategories;
          // $scope.displayItems = $scope.products.slice(0, 5);
          $rootScope.totalcount = data.data.totalcount;
          // alert($rootScope.totalcount)
          // $scope.productsprice = $scope.products.prices;
          $scope.totalItems = data.data.products.length;
          $scope.datalists = data.data.products;
        } else {

        }
      })
    }
    $scope.getProductCategories();


    $scope.gotoFilter = function () {
      $scope.modal.show();
    }

    $ionicModal.fromTemplateUrl('templates/filterPageModal.html', {
      scope: $scope,
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.closePopup = function () {
      $scope.modal.hide();
    }




    $rootScope.toggleCategory = function (category) {
      if ($scope.isGroupShown(category)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = category;
      }
    };
    $scope.isGroupShown = function (category) {
      return $scope.shownGroup == category;
    };

    $scope.categoryList = [];

    $scope.categoryList[0] = {
      name: 'First',
      items: [
        { title: 'Sample1' },
        { title: 'Sample2' },
        { title: 'Sample3' },
        { title: 'Sample4', id: 6, context: 'sanpm5' }
      ]
    };

    $scope.categoryList[1] = {
      name: 'Second',
      icon: 'fa fa-line-chart',
      // image: 'investment',
      items: [
        { title: 'Sample1' },
        { title: 'Sample2' },
        { title: 'Sample3' },
        { title: 'Sample4' }
      ]
    };

    $rootScope.goback = function () {
      $ionicHistory.goBack();
    }

  });

