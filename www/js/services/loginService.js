angular.module('shopMyTools.services', [])

    .service('loginService', function ($q, $http, LOGIN_URL) {

        this.userAuthentication = function (username, password, userType, ipAddress) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: LOGIN_URL + '/userlogin',
                headers: { 'Content-Type': 'application/json', 'Authorization': btoa(username + ':' + password), 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
                data: { "user_type": userType, "ip_address": ipAddress }

            }).then(function success(data) {
                deferred.resolve(data);

            }, function error(data) {
                deferred.reject(data);

            });

            return deferred.promise;
        };


    })


    .service('forgotPaswdService', function ($q, $http, LOGIN_URL) {
        this.forgotPassword = function ($scope, $rootScope) {

            var deferred = $q.defer();
            var data = angular.toJson($scope.forgetPswdData);

            $http({
                method: 'POST',
                url: LOGIN_URL + '/forgotpwd',
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
                data
            }).then(function success(data) {
                deferred.resolve(data);
            }, function error(data) {
                deferred.reject(data);
            });

            return deferred.promise;
        };
    })


    .service('registrationService', function ($q, $http, LOGIN_URL) {

        this.getOtp = function ($scope, $rootScope) {

            var deferred = $q.defer();
            var data = angular.toJson($scope.registerData);

            $http({
                method: 'POST',
                url: LOGIN_URL + '/userregistration',
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
                data
            })
                .then(function success(data) {
                    deferred.resolve(data);

                }, function error(data) {
                    deferred.reject(data);

                });

            return deferred.promise;
        };

        this.verifyOTP = function (otp, mobile, ipAddress) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: LOGIN_URL + '/verifyotp',
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
                data: { "mobile": mobile, "otp": otp, "ip_address": ipAddress }

            }).then(function success(data) {
                deferred.resolve(data);

            }, function error(data) {
                deferred.reject(data);

            });

            return deferred.promise;
        };

        this.resendOTP = function (mobile, otp) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: LOGIN_URL + '/resendotp',
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
                data: { "mobile": mobile, "otp": otp }
            }).then(function success(data) {
                deferred.resolve(data);

            }, function error(data) {
                deferred.reject(data);

            });

            return deferred.promise;
        };


    })


    .service('logoutService', function ($q, $http, LOGIN_URL) {
        this.userLogout = function (token) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: LOGIN_URL + '/logout',
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
                data: { "token": token }

            }).then(function success(data) {
                deferred.resolve(data);

            }, function error(data) {
                deferred.reject(data);

            });

            return deferred.promise;
        };
    })

    .service('resetPasswordService', function ($q, $http, LOGIN_URL) {
        this.resetPassword = function (userId, newPswd, confirmPswd) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: LOGIN_URL + '/resetpassword?user_id=' + userId,
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
                data: { "new_password": newPswd, "confirm_password": confirmPswd }
            }).then(function success(data) {
                deferred.resolve(data);
            }, function error(data) {
                deferred.reject(data);
            });
            return deferred.promise;
        };
    })


    .service('editProfileService', function ($q, $http, LOGIN_URL) {
        this.updateuserData = function (editData, userId) {
            var deferred = $q.defer();
            $http({
                method: 'PUT',
                url: LOGIN_URL + '/smtaccountinfo?id=' + userId,
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
                data: {
                    "firstname": editData.first_name, "lastname": editData.last_name,
                    "mobile": "91" + editData.user_mobile
                }
            }).then(function success(data) {
                deferred.resolve(data);
            }, function error(data) {
                deferred.reject(data);
            });
            return deferred.promise;
        };
    })

    .service('UserService', function () {
        // For the purpose of this example I will store user data on ionic local storage but you should save it on a database

        var setUser = function (user_data) {
            window.localStorage.starter_google_user = JSON.stringify(user_data);
        };

        var getUser = function () {
            return JSON.parse(window.localStorage.starter_google_user || '{}');
        };

        return {
            getUser: getUser,
            setUser: setUser
        };
    })

    .service('couponService', function ($q, $http, SERVER_URL) {
        this.getCoupons = function () {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: SERVER_URL + '/homepage',
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }

            }).then(function success(data) {
                deferred.resolve(data);

            }, function error(data) {
                deferred.reject(data);

            });

            return deferred.promise;
        };
    })
