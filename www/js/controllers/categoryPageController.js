angular.module('shopMyTools.categoryPageController', [])

  .controller('categoryController', function ($scope, $state, $rootScope,categoryService) {
    
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


      $scope.gotoFilter = function(){
        $state.go('');
      }


  });

