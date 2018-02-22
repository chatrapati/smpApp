angular.module('shopMyTools.homeController', [])

    .controller('homeController', function ($scope, $state, homePageService, $rootScope, $ionicLoading, categoryService, $ionicPopup, viewCartItemsService,searchProductsMoreService) {

        $rootScope.searchDiv = false;

        //home top slider
        $scope.firstCarouselImages = ["img/banners/1.png", "img/banners/2.png", "img/banners/3.png"];

        $scope.homePageDetails = function () {
            $ionicLoading.show({
                template: 'Loading...'
            });
            homePageService.homePageMethod().then(function (data) {
                $ionicLoading.hide();
                if (data.data.status == 'Success') {
                    $scope.topbrands = data.data.topbrands;
                    $scope.deals = data.data.deals;
                    $scope.emergingbrands = data.data.emergingbrands;
                    $scope.collections = data.data.collections;
                    $scope.getOffers("");
                } else {

                }
            })

        }
        $scope.homePageDetails();

        //offers

        $scope.getOffers = function (categoryObj) {
            $ionicLoading.show({
                template: 'Loading...'
            });
            homePageService.allOffersMethod(categoryObj).then(function (data) {
                $ionicLoading.hide();
                if (data.data.status == 'Success') {
                    $scope.Offers = data.data.offerscats;
                    $rootScope.offersArray = [];
                    for (i = 0; i < $scope.Offers.length; i++) {
                        $scope.offersObj = $scope.Offers[i];
                        for (j = 0; j < $scope.offersObj.prices.length; j++) {
                            if ($scope.offersObj.prices[j].enduser_price != 0) {
                                $rootScope.offersArray.push($scope.offersObj)
                            }
                        }
                    }
                }
            });
            $scope.getNewArrivals("");
        }



        // $scope.getOffers("");

        $scope.gotoCategoryPage = function (product, type) {
            $rootScope.categoryName = product;
            window.localStorage['categoryType'] = type;
            if (type == 'category') {
                window.localStorage['categoryName'] = product;
            } else {
                window.localStorage['brandName'] = product;
            }
            $state.go('categoryCartPage');
        }

        $scope.getProductDetails = function (productObj) {
            window.localStorage['productName'] = productObj.upload_name;
            $state.go("productDetail_page")
        }


        //swiper
        $scope.galleryOptions = {
            pagination: '.swiper-pagination',
            slidesPerView: 2.2,
            freeMode: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            paginationClickable: true,

            spaceBetween: 5
        };
        $scope.galleryOptions_deal = {
            pagination: '.swiper-pagination',
            slidesPerView: 1.4,
            freeMode: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            paginationClickable: true,

            spaceBetween: 5
        };


        //NewArrivals


        $scope.getNewArrivals = function (categoryObj) {
            $ionicLoading.show({
                template: 'Loading...'
            });
            homePageService.allNewArrivalsMethod(categoryObj).then(function (data) {
                $ionicLoading.hide();
                if (data.data.status == 'Success') {
                    $scope.newarrivals = data.data.newarrivalcats;
                    $rootScope.newarrivalsArray = [];
                    for (i = 0; i < $scope.newarrivals.length; i++) {
                        $scope.newarrivalsObj = $scope.newarrivals[i];
                        for (j = 0; j < $scope.newarrivalsObj.prices.length; j++) {
                            if ($scope.newarrivalsObj.prices[j].enduser_price != 0) {

                                $rootScope.newarrivalsArray.push($scope.newarrivalsObj)
                            }
                        }
                    }
                } else {

                }

            })
        }

        //  $scope.getNewArrivals("")


        //rating

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

        $scope.addtoCart = function (productData) {

            $scope.productDataList = [];
            $ionicLoading.show({
                template: 'Loading...'
            });
            //  viewCartItemsService.getCartItemsList(window.localStorage['user_id']).then(function (data) {

            // if (data.data.status == 'success') {
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

            //  })




        }


        $scope.addtoWishList = function (productData) {
            $ionicLoading.show({
                template: 'Loading...'
            });
            categoryService.addToWishListMethod(window.localStorage['user_id'], productData.upload_name).then(function (data) {
                $ionicLoading.hide();
                if (data.data.status == 'product saved successfully') {
                    $rootScope.wishListItemsCount = data.data.items_count;

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



        //Orders Count

        $scope.getOrdersCount = function () {
            $ionicLoading.show({
                template: 'Loading...'
            });
            $scope.userInfo = JSON.parse(localStorage.getItem('userInfo'));
            homePageService.getOrdersCount($scope.userInfo.email, $scope.userInfo.user_mobile, window.localStorage['user_id']).then(function (data) {
                $ionicLoading.hide();
                if (data.data.status == 'Success') {
                    // $scope.ordersCount = data.data;
                    $rootScope.wishListItemsCount = data.data.wishlist_items;
                    $rootScope.CartItemsCount = data.data.add_to_cart;
                    $rootScope.ordersCount = data.data.orders_count;
                    $rootScope.customerData = data.data.cust_details
                    $rootScope.couponCode = data.data.cupon_code;
                    if (data.data.reward_points == null) {
                        $rootScope.rewardPoints = 0;
                    } else {
                        $rootScope.rewardPoints = data.data.reward_points;

                    }
                } else {
                    $ionicPopup.alert({
                        template: data.data.status,
                        title: 'Error!'
                    });
                }
            })
        };
          $scope.getOrdersCount();

        $scope.getCartItemsList = function () {
            $ionicLoading.show({
                template: 'Loading...'
            });
            viewCartItemsService.getCartItemsList(window.localStorage['user_id']).then(function (data) {
                $ionicLoading.hide();
                if (data.data.status == 'success') {
                    $rootScope.cartItemsList = data.data.item_list;
                    $rootScope.grand_total = data.data.grand_total;
                    $rootScope.CartItemsCount = $rootScope.cartItemsList.length;
                } else if (data.data.status == 'no data available of this user') {
                    $rootScope.cartItemsList = [];
                    $rootScope.CartItemsCount = $rootScope.cartItemsList.length;
                }

            })
        };
        $scope.getCartItemsList();

        //search
        $scope.getSearchtDetails = function (searchKey) {
            $state.go("search")
        }

      


    });
