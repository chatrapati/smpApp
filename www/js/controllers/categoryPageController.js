angular.module('shopMyTools.categoryPageController', [])

  .controller('categoryController', function ($scope, $state, $rootScope, categoryService, $ionicModal, $ionicHistory, $ionicLoading, $ionicPopup) {

    $scope.getProductCategories = function (fromVal, toVal) {
      $rootScope.getCategoryProductData = {};
      $rootScope.getCategoryProductData.category = window.localStorage['categoryName'];
      $rootScope.categoryName = window.localStorage['categoryName'];
      $rootScope.getCategoryProductData.subcategory = [""];
      $rootScope.getCategoryProductData.from = 0;
      $rootScope.getCategoryProductData.to = 12;
      $rootScope.getCategoryProductData.val = "popularty";
      $scope.callService();
    }


    $scope.callService = function () {
      $ionicLoading.show({
        template: 'Loading...'
      });
      categoryService.getAllCategoriesOfProduct($scope, $rootScope).then(function (data) {
        $ionicLoading.hide();
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


    $scope.showNoOfItems = [
      { value: "12", Name: "12" },
      { value: "24", Name: "24" },
      { value: "36", Name: "36" }
    ];
    $scope.noOfItems = $scope.showNoOfItems[0].value;

    $scope.showSortItems = [
      { value: "popularty", Name: "Popularity" },
      { value: "topselling", Name: "Topselling" },
      { value: "namefilter", Name: "Name" },
      { value: "price_low_high", Name: "Price:Low to High" },
      { value: "price_high_low", Name: "Price:High to Low" }
    ];
    $scope.sortItem = $scope.showSortItems[0].value;

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
      $state.go('app.home');
      // $ionicHistory.goBack();
    }



    $scope.addtoCart = function (productData) {
      $scope.productDataList = [];
      $scope.productDataList.push({ "productdescription": productData.upload_name, "qty": "1" })
      $ionicLoading.show({
        template: 'Loading...'
      });
      categoryService.addToCartMethod($scope.productDataList, window.localStorage['user_id']).then(function (data) {
        window.localStorage['orderId'] = data.data.orderid;
        $ionicLoading.hide();
        if (data.data.status == 'item added to cart') {
          $ionicPopup.alert({
            template: 'Added to Cart Successfully!',
            title: 'Success!'
          });
        } else if (data.data.status == 'item added to cart..') {
          $ionicPopup.alert({
            template: 'Added to Cart Successfully!',
            title: 'Success!'
          });
        }
        else if (data.data.status == 'out off stock') {
          $ionicPopup.alert({
            template: 'Out Off Stock!',
            title: 'Sorry!'
          });
        }
      });
    }


    $scope.addtoWishList = function (productData) {
      $ionicLoading.show({
        template: 'Loading...'
      });
      categoryService.addToWishListMethod(window.localStorage['user_id'], productData.upload_name).then(function (data) {
        $ionicLoading.hide();
        if (data.data.status == 'product saved successfully') {
          $ionicPopup.alert({
            template: 'Added to Wish List Successfully!!',
            title: 'Success!'
          });
        } else {
          $ionicPopup.alert({
            template: data.data.status,
            title: 'Sorry!'
          });
        }

      })
    }



  });

