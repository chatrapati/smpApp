angular.module('shopMyTools.controllers', [])

    .controller('welcomeController', function ($scope, $state) {

        $scope.options = {
            loop: false,
            effect: 'slide', // cube, coverflow
            speed: 1500,
        }

        $scope.$on("$ionicSlides.sliderInitialized", function (event, data) {
            // data.slider is the instance of Swiper
            $scope.slider = data.slider;
        });

        $scope.$on("$ionicSlides.slideChangeStart", function (event, data) {
            console.log('Slide change is beginning');
        });

        $scope.$on("$ionicSlides.slideChangeEnd", function (event, data) {
            // note: the indexes are 0-based
            $scope.activeIndex = data.slider.activeIndex;
            $scope.previousIndex = data.slider.previousIndex;
        });

        $scope.gotoLoginPage = function () {
            $state.go('smtLogin');
        };

        if (window.localStorage['token']) {
            $state.go('app.home');
        }


    })

    .controller('loginController', function ($scope, $rootScope, $state, loginService, $ionicPopup, $ionicLoading) {

        $scope.loginData = {};

        $scope.user_type = "mobile";
        $scope.ip_address = "mobile";

        $scope.gotoRegistration = function () {
            $state.go('smt_registration');
            //  $state.go('app.home');
        };
        $scope.inputType = 'password';

        // Hide & show password function
        $scope.hideShowPassword = function () {
            if ($scope.inputType == 'password') {
                $scope.inputType = 'text';
            }
            else {
                $scope.inputType = 'password';
            }
        };



        $scope.login = function (form) {
            if (form.$valid) {
                $ionicLoading.show({
                    template: 'Loading...'
                });
                loginService.userAuthentication($scope.loginData.username, $scope.loginData.password, $scope.user_type, $scope.ip_address).then(function (data) {
                    $ionicLoading.hide();
                    if (data.data.status == 'Success') {
                        $rootScope.user_id = data.data.user_id;
                        $rootScope.token = data.data.token;
                        $rootScope.user_name = data.data.username;
                        $rootScope.user_info = data.data.userinfo;
                        $rootScope.mobileNo = data.data.userinfo.user_mobile;
                        if (data.data.billing_address != '') {
                            $rootScope.user_billing_Address = data.data.billing_address;
                        }
                        if (data.data.shipping_address != '') {
                            $rootScope.user_shipping_address = data.data.shipping_address;
                        }

                        window.localStorage['token'] = data.data.token;
                        window.localStorage['user_id'] = data.data.user_id;
                        window.localStorage['email'] = data.data.userinfo.email;
                        window.localStorage['mobile'] = data.data.userinfo.user_mobile;
                        localStorage.setItem('userInfo', JSON.stringify(data.data.userinfo));
                        localStorage.setItem('gstNumber', JSON.stringify(data.data.GSTnumber));
                        localStorage.setItem('shippingAddressInfo', JSON.stringify(data.data.shipping_address));
                        localStorage.setItem('billingAddressInfo', JSON.stringify(data.data.billing_address));
                        window.localStorage['user_name'] = $scope.userName;

                        $state.go('app.home');
                    } else {
                        $ionicPopup.alert({
                            template: data.data.status,
                            title: 'Error!'
                        });
                    }
                });
            }
        };


        $scope.gotoForgotPswd = function () {
            $state.go('forgotPassword');
        };
    })

    .controller('registrationController', function ($scope, $rootScope, registrationService, $state, $ionicPopup, $ionicLoading) {

        $scope.registerData = {};
        $scope.registrationData = {};
        $scope.otpData = {};

        $scope.registerData.newsletter = "unchecked";
        $scope.registerData.gstnumber = "";
        $scope.registerData.user_type = "mobile";


        $scope.getOtp = function (form) {
            if (form.$valid && $scope.registerData.password == $scope.registerData.confirm_password) {

                $scope.registerData.mobile = '91' + $scope.registrationData.mobile;
                $rootScope.mobile = $scope.registerData.mobile;

                $ionicLoading.show({
                    template: 'Loading...'
                });

                registrationService.getOtp($scope, $rootScope).then(function (data) {
                    $ionicLoading.hide();
                    if (data.data.status == 'Data saved successfully') {
                        $rootScope.otp = data.data.otp;
                        $rootScope.myPopup = $ionicPopup.show({
                            templateUrl: 'templates/otpPopup.html',
                            title: 'Enter OTP'
                        });
                    } else {
                        $ionicPopup.alert({
                            template: data.data.status,
                            title: 'Error!'
                        });
                    }

                });
            }
        };


        $scope.verifyOTP = function (form, otpData) {
            if (form.$valid) {
                $ionicLoading.show({
                    template: 'Loading...'
                });
                $scope.otp = JSON.stringify(otpData.otp);
                $scope.ip_address = "mobile";
                registrationService.verifyOTP($scope.otp, $rootScope.mobile, $scope.ip_address).then(function (data) {
                    $ionicLoading.hide();
                    if (data.data.status == 'Data saved successfully') {
                        $rootScope.user_id = data.data.user_id;
                        $rootScope.token = data.data.token;
                        $rootScope.myPopup.close();

                        $state.go('smtLogin');
                    } else {

                        $ionicPopup.alert({
                            template: data.data.status,
                            title: 'Error!'
                        });
                    }

                })
            }
        }

        $scope.resendOTP = function () {
            $ionicLoading.show({
                template: 'Loading...'
            });
            registrationService.resendOTP($rootScope.mobile, $rootScope.otp).then(function (data) {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    template: data.data.return,
                    title: 'Success!'
                });

            })
        }

        $scope.gotoLogin = function () {
            $state.go('smtLogin');
            // $state.go('app.home');
        };
    })



    .controller('forgotPasswordCtrl', function ($scope, $rootScope, forgotPaswdService, $state, $ionicPopup, $ionicLoading) {

        $scope.forgetPswdData = {};

        $scope.forgetPswd = function (form) {
            if (form.$valid) {
                $ionicLoading.show({
                    template: 'Loading...'
                });
                forgotPaswdService.forgotPassword($scope).then(function (data) {
                    $ionicLoading.hide();
                    if (data.data.status == 'email sent') {
                        $state.go('emailSent');
                    } else {
                        $ionicPopup.alert({
                            template: data.data.status,
                            title: 'Error!'
                        });
                    }

                })

            }
        };
        $scope.gotoLogin = function () {
            $state.go('smtLogin');
        };
    })


    .controller('menuController', function ($scope, $rootScope, $state, logoutService, $window) {
        $scope.gotoRespectivePage = function (page) {
            if (page == 'home') {
                $state.go('app.home');
            } else if (page == 'login') {
                $state.go('smtLogin');
            } else if (page == 'myorders') {
                $state.go('myorders');
            } else if (page == 'profile') {
                $state.go('app.home');
            } else if (page == 'wishlist') {
                $state.go('whishlist_page');
            } else if (page == 'cartPage') {
                $state.go('cart_page');
            } else if (page == 'chngpaswd') {
                $state.go('changePassword');
            } else if (page == 'chngadd') {
                $state.go('app.home');
            } else if (page == 'policy') {
                window.open('http://toolsomg.com/returnpolicy.html#!/', '_blank');
            } else if (page == 'aboutus') {
                window.open('http://toolsomg.com/aboutus.html#!/', '_blank');
            } else if (page == 'faq') {
                $state.go('app.home');
            } else if (page == 'logout') {

                logoutService.userLogout(window.localStorage['token']).then(function (data) {
                    if (data.data.status == 'success') {
                        $window.localStorage.clear();
                        // $scope = $scope.$new(true);
                        // $rootScope = $rootScope.$new(true);
                        $state.go('smtLogin');
                    } else {

                    }
                })
            }
        }


        $scope.gotoCartPage = function () {
            $state.go('cart_page');
        }


    })


    .controller('resetPasswordCntrl', function ($scope, $rootScope, $state, $ionicPopup, $ionicLoading, resetPasswordService) {

        $scope.resetPswdData = {};
        $scope.userId = window.localStorage['user_id'];
        $scope.resetPassword = function (form) {
            if (form.$valid && $scope.resetPswdData.new_password == $scope.resetPswdData.confirm_password) {
                resetPasswordService.resetPassword($scope.userId, $scope.resetPswdData.new_password, $scope.resetPswdData.confirm_password).then(function (data) {
                    if (data.data.status == "password changed successfully") {
                        $ionicPopup.alert({
                            template: 'Password Changes successfully!',
                            title: 'Success!'
                        });
                        $state.go('app.home');
                    }

                })
            }
        }

        $scope.goback = function () {
            $state.go('app.home');
            //  $window.history.go(-1);
        }

    })