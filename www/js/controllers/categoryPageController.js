angular.module('shopMyTools.categoryPageController', [])

  .controller('categoryController', function ($scope, $state, $rootScope, categoryService, $ionicModal, $ionicHistory, $ionicLoading, $ionicPopup, $window, reviews_service) {

    $scope.getProductCategories = function (fromVal, toVal) {
      $rootScope.getCategoryProductData = {};

      if (window.localStorage['categoryType'] == 'category') {
        $rootScope.getCategoryProductData.category = window.localStorage['categoryName'];
        $rootScope.categoryName = window.localStorage['categoryName'];
      } else {
        $rootScope.getCategoryProductData.brand = [window.localStorage['brandName']];
        $rootScope.categoryName = window.localStorage['brandName'];
      }


      $rootScope.getCategoryProductData.subcategory = [""];
      $rootScope.getCategoryProductData.from = 0;
      $rootScope.getCategoryProductData.to = 6;
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
          $rootScope.subcategoriesList = data.data.mobilesubcategories;
          $rootScope.brandsList = data.data.mobilebrandslist;
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
      { value: "6", Name: "6" },
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


    $scope.currentPage = 1;

    $scope.prevPage = function (page) {
      $scope.currentPage = page;
      $scope.currentPage -= 1;
      $rootScope.getCategoryProductData.to = $rootScope.getCategoryProductData.from;
      $rootScope.getCategoryProductData.from -= 6;
      $scope.callService();
    }

    $scope.nextPage = function (page) {
      $scope.currentPage = page;
      $scope.currentPage += 1;
      $rootScope.getCategoryProductData.from = $rootScope.getCategoryProductData.to;
      $rootScope.getCategoryProductData.to += 6;
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
      // $state.go('app.home');   
      $window.history.go(-1);
    }

    $scope.getProductDetails = function (productObj) {
      window.localStorage['productName'] = productObj.upload_name;
      $state.go("productDetail_page")
    }

    $scope.addtoCart = function (productData) {
      $scope.productDataList = [];

      $ionicLoading.show({
        template: 'Loading...'
      });
      // viewCartItemsService.getCartItemsList(window.localStorage['user_id']).then(function (data) {

      //   if (data.data.status == 'success') {
      //     $rootScope.cartItemsList = data.data.item_list;
      //     $rootScope.grand_total = data.data.grand_total;
      //     $rootScope.CartItemsCount = $rootScope.cartItemsList.length;
      if ($rootScope.cartItemsList.length > 0) {
        $scope.productDataList = $rootScope.cartItemsList;
      }

      $scope.productDataList.push({ "productdescription": productData.upload_name, "qty": "1" })
      $rootScope.CartItemsCount = $scope.productDataList.length;
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

      //   }

      // })



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


    $scope.openRivewModal = function (productName) {
      $scope.reviewProductName = productName;
      $scope.reviewmodal.show();
    }

    $ionicModal.fromTemplateUrl('templates/reviewModal.html', {
      scope: $scope,
    }).then(function (modal) {
      $scope.reviewmodal = modal;
    });

    $scope.closereviewPopup = function () {
      $scope.reviewmodal.hide();
    }


    $scope.ratingsObject = {
      iconOn: 'ion-ios-star',    //Optional
      iconOff: 'ion-ios-star-outline',   //Optional
      iconOnColor: 'rgb(200, 200, 100)',  //Optional
      iconOffColor: 'rgb(200, 100, 100)',    //Optional
      rating: 0, //Optional
      minRating: 0,    //Optional
      readOnly: true, //Optional
      callback: function (rating, index) {    //Mandatory
        $scope.ratingsCallback(rating, index);
      }
    };
    $scope.ratingsCallback = function (rating, index) {
      $scope.rating = JSON.stringify(rating);
    };

    $scope.reviewdata = {};

    $scope.submitReviews = function (data) {
      if ($scope.rating != undefined) {
        
        reviews_service.reviewsMethod(data, $scope.rating, $scope.reviewProductName, window.localStorage['email']).then(function (data) {
          if (data.data.success == 'success') {
            // $ionicPopup.alert({
            //   template: 'Thanks for Review.... Your comment will be updated in 48 hours.',
            //   title: 'Success!'
            // });
            $scope.closereviewPopup();
          }
        });
        
      } else {
        $ionicPopup.alert({
          template: 'Please Give Rating',
          title: 'Alert!'
        });
      }
    }



  });

