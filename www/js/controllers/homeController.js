angular.module('shopMyTools.homeController', [])

    .controller('homeController', function ($scope, $state, homePageService, $rootScope, allOffersService, allNewArrivalsService, $ionicLoading) {

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
            allOffersService.allOffersMethod(categoryObj).then(function (data) {
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

        }



        $scope.getOffers("");

        $scope.gotoCategoryPage = function (categoryName) {
            $rootScope.categoryName = categoryName;
            window.localStorage['categoryName'] = categoryName;
            $state.go('categoryCartPage');
        }

        $scope.getProductDetails = function (productObj) {
            window.localStorage['productName'] = productObj.upload_name;
            $state.go("productDetail_page")
        }

        $scope.getCategoryBasedOnBrands = function (brandObj) {
            window.localStorage['categoryName'] = "";
            localStorage.setItem('brandName',brandObj.brandname)
           // window.localStorage['brandName'] = brandObj.brandname;
           $state.go('categoryCartPage');

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
            allNewArrivalsService.allNewArrivalsMethod(categoryObj).then(function (data) {
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

        $scope.getNewArrivals("")

    });
