angular.module('shopMyTools.categoryPageController', [])

  .controller('categoryController', function ($scope, $state, $rootScope, categoryService, $ionicModal, $ionicHistory) {

    $scope.getProductCategories = function (fromVal, toVal) {
      $rootScope.getCategoryProductData = {};
      $rootScope.getCategoryProductData.category = window.localStorage['categoryName'];
      $rootScope.getCategoryProductData.subcategory = [""];
      $rootScope.getCategoryProductData.from = 0;
      $rootScope.getCategoryProductData.to = 12;
      $rootScope.getCategoryProductData.val = "popularty";
      $scope.callService();
    }


    $scope.callService = function () {
      categoryService.getAllCategoriesOfProduct($scope, $rootScope).then(function (data) {
        $rootScope.loading = false;
        if (data.data) {

          $rootScope.products = data.data.products;
          $rootScope.subcategoriesList = data.data.subcategories;
          $rootScope.brandsList = data.data.brand_data;
          $rootScope.minPrice = data.data.minprice;
          $rootScope.maxPrice = data.data.maxprice;
          $rootScope.totalcount = data.data.totalcount;
          $rootScope.totalItems = data.data.products.length;
          $rootScope.datalists = data.data.products;

        }
      })
    }

    $scope.getProductCategories();

    $scope.getselectedNoProducts = function (noOfItems) {
      $rootScope.getCategoryProductData.to = noOfItems;
      $scope.callService();
    }

    $scope.getsortedProducts = function (sortItem) {
      $rootScope.getCategoryProductData.val = sortItem
      $scope.callService();
    }


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

    $rootScope.sublist = [];
    $scope.getSubcatigory = function (subCatigory, checkValue) {
      var indexOfDay = $rootScope.sublist.indexOf(subCatigory);

      if (checkValue) {
        $rootScope.sublist.push(subCatigory);
        $rootScope.getCategoryProductData.subcategory = $rootScope.sublist;
      } else {
        $rootScope.sublist.splice(indexOfDay, 1)
        $rootScope.getCategoryProductData.subcategory = $rootScope.sublist;
      }
    }
    $rootScope.selectedBrandList = [];
    $scope.getBrand = function (brand, brandValue) {
      var indexOfBrand = $rootScope.selectedBrandList.indexOf(brand);
      if (brandValue) {
        $rootScope.selectedBrandList.push(brand);
        $rootScope.getCategoryProductData.brand = $rootScope.selectedBrandList;
      } else {
        $rootScope.selectedBrandList.splice(indexOfBrand, 1)
        $rootScope.getCategoryProductData.brand = $rootScope.selectedBrandList;
      }
    }

    $scope.getPriceRange = function (range) {
      $rootScope.getCategoryProductData.pricerange = $rootScope.minPrice + '-' + range;
    }

    $scope.getfiterItems = function (filterData) {
      $scope.callService();
      $scope.modal.hide();
    }

    $scope.goback = function () {
      alert('back');
      $ionicHistory.goBack();
    }

  });

