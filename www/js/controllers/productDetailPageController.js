angular.module('shopMyTools.productDetailPageController', [])

    .controller('productDetailController', function ($scope, $rootScope, product_detailed_service, $ionicHistory, $state, $window) {
        $scope.getProductDetails = function () {
            product_detailed_service.getAllDetailsOfProduct(window.localStorage['productName']).then(function (data) {
                //alert(JSON.stringify(data));

                if (data.data.status == 'success') {

                    //  var result = data.data;
                    $scope.productDetail = data.data.Product;
                    $scope.productDetailPrice = data.data.price_info;
                    $scope.ProductSpecification = data.data.attribute_info;

                    $scope.images = data.data.Product.extraimages;
                    $scope.relatedproducts = data.data.Related_Products;
                    $scope.upsellproducts = data.data.Upsell_Products;
                    
                    // $scope.productDetailedReviewBlock = result.product_Reviews;
                    // $scope.brandDetailPriceArray = result.price_info;
                    // $scope.brandDetailSpecAttrArray = result.attribute_info;
                    // $scope.brandDetailQuantity = result.Quantity;
                    // $scope.brandDetailRelatedProductsArray = result.Related_Products;

                 

                }
                else {
                    //alert('');
                }
            })
        }


        $scope.getProductDetails();




        $rootScope.goback = function () {
            $window.history.go(-1);
           //$state.go('app.home');
        }
    });