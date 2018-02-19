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


                    $scope.imgList = [];

                    for (var i = 0; i <= $scope.images.length; i++) {
                        if ($scope.images[i] != '' && $scope.images[i] != undefined) {
                            $scope.imgList.push($scope.images[i]);
                        }
                       
                    }

                    $scope.imagess = $scope.imgList;


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

        $scope.getProductDetails = function (productObj) {
            window.localStorage['productName'] = productObj.upload_name;
            $state.go("productDetail_page")
        }


        $scope.ratingsObject = {
            iconOn: 'ion-ios-star',    //Optional
            iconOff: 'ion-ios-star-outline',   //Optional
            iconOnColor: 'rgb(200, 200, 100)',  //Optional
            iconOffColor: 'rgb(200, 100, 100)',    //Optional
            rating: 2, //Optional
            minRating: 1,    //Optional
            readOnly: true, //Optional
            callback: function (rating, index) {    //Mandatory
                $scope.ratingsCallback(rating, index);
            }
        };

        $scope.ratingsCallback = function (rating, index) {
            console.log('Selected rating is : ', rating, ' and the index is : ', index);
        };






        $rootScope.goback = function () {
            $window.history.go(-1);
            //$state.go('app.home');
        }
    });