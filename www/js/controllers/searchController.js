angular.module('shopMyTools.searchController', [])

    .controller('searchPageController', ['$scope', '$http', '$location', '$rootScope',
        'searchProductsMoreService',
        function ($scope, $http, $location, $rootScope, searchProductsMoreService) {
            console.log(localStorage.getItem('searchkey'))
            //     $rootScope.searchedProducts=window.localStorage['searchedProducts'];
            $scope.getSearchedCat = function () {
                searchProductsMoreService.searchProductsMoreMethod(localStorage.getItem('searchkey')).then(function (data) {
                    //alert(JSON.stringify(data))
                    if (data.data.status == 'success') {
                        $scope.searchedMoreProducts = data.data.product_info;
                    }

                })
            }

            $scope.getSearchedCat();


        }])