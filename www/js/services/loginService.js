angular.module('shopMyTools.services', [])

    .service('loginService', function ($q, $http, LOGIN_URL) {

        this.userAuthentication = function (username, password) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: LOGIN_URL + '/userlogin',
                headers: { 'Content-Type': 'application/json', 'Authorization': btoa(username + ':' + password), 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' }

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

        this.verifyOTP = function (otp, mobile) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: LOGIN_URL + '/verifyotp',
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
                data: { "mobile": mobile, "otp": otp }

            }).then(function success(data) {
                deferred.resolve(data);

            }, function error(data) {
                deferred.reject(data);

            });

            return deferred.promise;
        };

        this.resendOTP = function (userId) {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: LOGIN_URL + '/resendotp?user_id=' + userId,
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' },

            }).then(function success(data) {
                deferred.resolve(data);

            }, function error(data) {
                deferred.reject(data);

            });

            return deferred.promise;
        };


    })