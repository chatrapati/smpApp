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
          $scope.brandsList = data.data.brand_data;
          $scope.minPrice = data.data.minprice;
          $scope.maxPrice = data.data.maxprice;

          // $scope.displayItems = $scope.products.slice(0, 5);
          $rootScope.totalcount = data.data.totalcount;
          // alert($rootScope.totalcount)
          // $scope.productsprice = $scope.products.prices;
          $scope.totalItems = data.data.products.length;
          $scope.datalists = data.data.products;

        } 
      })
    }
     $scope.getProductCategories();


    
$scope.getRange = function(range){
  alert(range);
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

    

   

    // $rootScope.toggleCategory = function (category) {
    //   if ($scope.isGroupShown(category)) {
    //     $scope.shownGroup = null;
    //   } else {
    //     $scope.shownGroup = category;
    //   }
    // };
    // $scope.isGroupShown = function (category) {
    //   return $scope.shownGroup == category;
    // };

    // $scope.categoryList = [];

    // $scope.categoryList[0] = {
    //   name: 'Sub Categories',
    //   list: $rootScope.subcategoriesList
    // };

    // $scope.categoryList[1] = {
    //   name: 'Brands',
    //   list: $rootScope.brandsList
    // };

    $rootScope.goback = function () {
      $ionicHistory.goBack();
    }

  });

