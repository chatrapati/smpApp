angular.module('shopMyTools.dashboardServices', [])

    .service('myOrdersService', function ($q, $http, SERVER_URL1) {
        this.myOrdersMethod = function (userid) {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: SERVER_URL1 + '/yourorders?user_id=' + userid,
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }

            }).then(function success(data) {
                deferred.resolve(data);

            }, function error(data) {
                deferred.reject(data);

            });

            return deferred.promise;
        };

        this.completeOrdersMethod = function (orderId) {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: SERVER_URL1 + '/order_data?orderid=' + orderId,
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }

            }).then(function success(data) {
                deferred.resolve(data);


            }, function error(data) {
                deferred.reject(data);

            });

            return deferred.promise;
        };

        this.getInvoiceordersList = function (userid) {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: SERVER_URL1 + '/invoices?user_id=' + userid,
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }

            }).then(function success(data) {
                deferred.resolve(data);

            }, function error(data) {
                deferred.reject(data);

            });

            return deferred.promise;
        };

        this.getPendingOrdersList = function (userid) {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: SERVER_URL1 + '/pendingorders?user_id=' + userid + '&status=pending',
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }

            }).then(function success(data) {
                deferred.resolve(data);

            }, function error(data) {
                deferred.reject(data);

            });

            return deferred.promise;
        };

        this.cancelOrderMethod = function (orderid) {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: SERVER_URL1 + '/cancel_order?orderid=' + orderid,
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }

            }).then(function success(data) {
                deferred.resolve(data);

            }, function error(data) {
                deferred.reject(data);

            });

            return deferred.promise;
        };

    })


    .service('wishListService', function ($q, $http, SERVER_URL1) {
        this.getWishList = function (userid) {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: SERVER_URL1 + '/yourwishlist?user_id=' + userid,
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }

            }).then(function success(data) {
                deferred.resolve(data);

            }, function error(data) {
                deferred.reject(data);

            });

            return deferred.promise;
        };

        this.deleteWishlistItem = function (userId, productName) {
            var deferred = $q.defer();

            $http({
                method: 'DELETE',
                url: SERVER_URL1 + '/delproduct',
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
                data: { "user_id": userId, "product_name": productName }

            }).then(function success(data) {
                deferred.resolve(data);

            }, function error(data) {
                deferred.reject(data);

            });

            return deferred.promise;
        };

    })


    .service('viewCartItemsService', function ($q, $http, LOGIN_URL) {

        this.getCartItemsList = function (userid) {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: LOGIN_URL + '/initiateorder?userid=' + userid,
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }

            }).then(function success(data) {
                deferred.resolve(data);

            }, function error(data) {
                deferred.reject(data);

            });

            return deferred.promise;
        };

        this.deleteCartItem = function (userid, productName) {
            var deferred = $q.defer();

            $http({
                method: 'DELETE',
                url: LOGIN_URL + '/initiateorder?userid=' + userid,
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
                data: { "product": productName }

            }).then(function success(data) {
                deferred.resolve(data);

            }, function error(data) {
                deferred.reject(data);

            });

            return deferred.promise;
        };


    })

    .service('ordersCountService', function ($q, $http, LOGIN_URL) {
        this.getOrdersCount = function (email, mobile, userId) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: LOGIN_URL + '/orderscount',
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
                data: { "email": email, "mobile": mobile, "user_id": userId }
            }).then(function success(data) {
                deferred.resolve(data);
            }, function error(data) {
                deferred.reject(data);
            });
            return deferred.promise;
        };
    })