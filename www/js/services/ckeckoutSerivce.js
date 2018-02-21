angular.module('shopMyTools.ckeckoutSerivce', [])


    .service('checkoutService', function ($q, $http, LOGIN_URL) {

        this.getPincodeStatus = function (pincode) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: LOGIN_URL + '/pincode?pincode=' + pincode,
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }

            }).then(function success(data) {
                deferred.resolve(data);
            }, function error(data) {
                deferred.reject(data);
            });
            return deferred.promise;
        };


        this.getDealersList = function (latLong) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: LOGIN_URL + '/dealerlist',
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
                data: { "lat_long": latLong }

            }).then(function success(data) {
                deferred.resolve(data);

            }, function error(data) {
                deferred.reject(data);

            });

            return deferred.promise;
        };

        this.saveOrderMethod = function (orderArray) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: LOGIN_URL + '/checkout',
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
                data: orderArray
            }).then(function success(data) {
                deferred.resolve(data);
            }, function error(data) {
                deferred.reject(data);
            });
            return deferred.promise;
        };

        this.submitPayment = function (orderid, userId) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: LOGIN_URL + '/paymentstatus?orderid=' + orderid + '&user_id=' + userId,
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }

            }).then(function success(data) {
                deferred.resolve(data);
            }, function error(data) {
                deferred.reject(data);
            });
            return deferred.promise;
        };


    })

