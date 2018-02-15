angular.module('shopMyTools.categoryPageController', [])

  .controller('categoryController', function ($scope, $state, $rootScope,product_categories_service) {
    $scope.getProductCategories = function (fromVal, toVal) {
      $scope.loading = true;
      product_categories_service.getAllCategoriesOfProduct(window.localStorage['categoryName'], window.localStorage['subCategoryName'], fromVal, toVal).then(function (data) {
        $scope.loading = false;
        if (data.data) {
         
          
          
          $scope.products = data.data.products;
          // $scope.displayItems = $scope.products.slice(0, 5);
          $rootScope.totalcount = data.data.totalcount;
          // alert($rootScope.totalcount)
          $scope.productsprice = $scope.products.prices;
          $scope.totalItems = data.data.products.length;
          $scope.datalists = data.data.products;
        } else {

        }
      })
    }



  });

