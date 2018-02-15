angular.module('shopMyTools.homeController', [])

    .controller('homeController', function ($scope, $state, homePageService, $rootScope, allOffersService) {

        //home top slider
        $scope.firstCarouselImages = ["img/banners/1.png", "img/banners/2.png", "img/banners/3.png"];

        $scope.homePageDetails = function () {
            $scope.loading = true;
            homePageService.homePageMethod().then(function (data) {

                $scope.loading = false;

                if (data.data.status == 'Success') {

                    $scope.topbrands = data.data.topbrands;
                    $scope.deals = data.data.deals;
                    $scope.emergingbrands = data.data.emergingbrands;
                    $scope.collections = data.data.collections;

                } else {

                    //  alert(data.data.status)

                }



            })

        }
        $scope.homePageDetails();


        $rootScope.getProductDetails = function (productObj) {

            window.localStorage['productName'] = productObj.upload_name;

            localStorage.removeItem('isReviewStatus');

            $rootScope.showHintFlag = 'false';

            localStorage.setItem('breadCrumb', productObj.upload_category);

            localStorage.setItem('breadCrumb1', productObj.upload_subcategory);


            // $window.open("http://localhost/smtfeb6evening/index.html#!/productDetailPage");

            $window.open("http://toolsomg.com/#!/productDetailPage");


            // $location.path("productDetailPage");

        }


        //offers

        $scope.getOffers = function (categoryObj) {

            $scope.loading = true;

            allOffersService.allOffersMethod(categoryObj).then(function (data) {

                $scope.loading = false;

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



                } else {

                    //  alert(data.data.status)

                }



            })

        }



        $scope.getOffers("");




        //swiper
        $scope.galleryOptions = {
            pagination: '.swiper-pagination',
            slidesPerView: 2.5,
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



    });
