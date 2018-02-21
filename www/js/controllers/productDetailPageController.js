angular.module('shopMyTools.productDetailPageController', [])

<<<<<<< HEAD
    .controller('productDetailController', function ($scope, $rootScope, product_detailed_service, $ionicPopup, $state, $window, $ionicLoading, categoryService, viewCartItemsService, reviews_service) {
=======
    .controller('productDetailController', function ($scope, $rootScope, product_detailed_service, $ionicPopup, $state, $window, $ionicLoading, categoryService) {
>>>>>>> ccdae0435102a17cf9f419913b7b60c3f3798357
        $scope.getProductDetails = function () {
            $scope.ratingsList = [];
            $rootScope.imgList = [];
            $ionicLoading.show({
                template: 'Loading...'
            });
            product_detailed_service.getAllDetailsOfProduct(window.localStorage['productName']).then(function (data) {
                //alert(JSON.stringify(data));

                if (data.data.status == 'success') {

                    //  var result = data.data;
                    $scope.productDetail = data.data.Product;
                    $scope.productDetailPrice = data.data.price_info;
                    $scope.ProductSpecification = data.data.attribute_info;
                    $scope.productDetailedReview = data.data.product_Reviews;
                    $scope.images = data.data.Product.extraimages;

                    for (i = 0; i < $scope.productDetailedReview.length; i++) {
                        $scope.ratingsList.push($scope.productDetailedReview[i].rating)
                    }


                    for (var i = 0; i <= $scope.images.length; i++) {
                        if ($scope.images[i] != '' && $scope.images[i] != undefined) {
                            $rootScope.imgList.push($scope.images[i]);
                        }

                        //  $scope.imagess = $scope.imgList;

                    if ($scope.images.length > 0) {
                        for (var i = 0; i <= $scope.images.length; i++) {
                            if ($scope.images[i] != '' && $scope.images[i] != undefined) {
                                $rootScope.imgList.push($scope.images[i]);
                            }
                        }


                        //  $scope.imagess = $scope.imgList;

                        $scope.imgList.push($scope.productDetail.upload_photo);
                    }
                    $ionicLoading.hide();
                    //   $scope.imagess = $rootScope.imgList;


                    $scope.relatedproducts = data.data.Related_Products;
                    $scope.upsellproducts = data.data.Upsell_Products;

                    $scope.range = function(n) {
                        return new Array(n);
                    };

                    $scope.givenRatingsObject = {
                        iconOn: 'ion-ios-star',    //Optional
                        iconOff: 'ion-ios-star-outline',   //Optional
                        iconOnColor: 'rgb(200, 200, 100)',  //Optional
                        iconOffColor: 'rgb(200, 100, 100)',    //Optional
                        rating: $scope.ratingsList, //Optional
                        minRating: 0,    //Optional
                        readOnly: true, //Optional
                        // callback: function (rating, index) {    //Mandatory
                        //     $scope.ratingsCallback(rating, index);
                        // }
                    };

                    
  


                }
                else {
                    //alert('');
                }
            })
        }
        $scope.reviewdata = {};

        $scope.submitReviews = function (data) {


            reviews_service.reviewsMethod(data, $scope.rating, $scope.productDetail.upload_name, window.localStorage['email']).then(function (data) {

                if (data.data.success == 'success') {
                    alert('Thanks for Review.... Your comment will be updated in 48 hours.');


                } else {
                    alert(data.data.success)
                }
            });
        };



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
            rating: 0, //Optional
            minRating: 0,    //Optional
            readOnly: true, //Optional
            callback: function (rating, index) {    //Mandatory
                $scope.ratingsCallback(rating, index);
            }
        };

        //    $scope.productDetailedReview = [];




        $scope.ratingsCallback = function (rating, index) {
            // console.log('Selected rating is : ', rating, ' and the index is : ', index);
            $scope.rating = JSON.stringify(rating);
            //console.log(JSON.stringify(rating));

        };



        $scope.addtoCart = function (productName) {
            $scope.productDataList = [];
            $ionicLoading.show({
                template: 'Loading...'
            });
            // viewCartItemsService.getCartItemsList(window.localStorage['user_id']).then(function (data) {

            //     if (data.data.status == 'success') {
            //         $rootScope.cartItemsList = data.data.item_list;
            //         $rootScope.grand_total = data.data.grand_total;
                    if ($rootScope.cartItemsList.length > 0) {
                        $scope.productDataList = $rootScope.cartItemsList;
                    }
                    $scope.productDataList.push({ "productdescription": productName, "qty": "1" })
                    $rootScope.CartItemsCount =  $scope.productDataList.length;
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

        //     })

        // }



        $rootScope.goback = function () {
            $window.history.go(-1);
            //$state.go('app.home');
        }
    });