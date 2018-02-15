angular.module('shopMyTools.categoryPageController', [])


// $scope.getProductCategories = function (fromVal, toVal) {
//     $scope.loading = true;
//     product_categories_service.getAllCategoriesOfProduct(window.localStorage['categoryName'], window.localStorage['subCategoryName'], fromVal, toVal).then(function (data) {
//       $scope.loading = false;
//       if (data.data) {
//         $scope.categories = data.data.subcategories;
//         $scope.fromVal = data.data.from;
//         $scope.toVal = data.data.to;
//         // window.localStorage['categories'] = $scope.categories;
//         localStorage.setItem('subCategories', JSON.stringify($scope.categories))
//         $rootScope.brandsData = data.data.brand_data;
//         // alert($rootScope.brandsData)
//         // window.localStorage['brandsData'] = $rootScope.brandsData;
//         localStorage.setItem('brandsData', JSON.stringify($rootScope.brandsData))
//         $scope.minrange = data.data.minprice;
//         $scope.maxrange = data.data.maxprice;
//         localStorage.setItem('minrange',$scope.minrange);
//         localStorage.setItem('maxrange',$scope.maxrange);

//         $scope.value = data.data.minrange;
//         $scope.products = data.data.products;
//         // $scope.displayItems = $scope.products.slice(0, 5);
//         $rootScope.totalcount = data.data.totalcount;
//         // alert($rootScope.totalcount)
//         $scope.productsprice = $scope.products.prices;
//         $scope.totalItems = data.data.products.length;
//         $scope.datalists = data.data.products;
//       } else {

//       }
//     })
//   }

.controller('filterController', function ($scope, $state) {
   
        $scope.groups = [];
        for (var i=0; i<3; i++) {
          $scope.groups[i] = {
            name: i,
            items: []
          };
          for (var j=0; j<3; j++) {
            $scope.groups[i].items.push(i + '-' + j);
          }
        }
        
        /*
         * if given group is the selected group, deselect it
         * else, select the given group
         */
        $scope.toggleGroup = function(group) {
          if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
          } else {
            $scope.shownGroup = group;
          }
        };
        $scope.isGroupShown = function(group) {
          return $scope.shownGroup === group;
        };
        
        
      

});

