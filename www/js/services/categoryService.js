
angular.module('shopMyTools.categoryService', [])
    .service('categoryService', function ($q, $http, PRODUCT_CATEGORY_SERVICE, LOGIN_URL, SERVER_URL1) {

        this.getAllCategoriesOfProduct = function ($scope, $rootScope) {
            var deferred = $q.defer();
            var data = angular.toJson($scope.getCategoryProductData);

            $http({
                method: 'POST',
                url: PRODUCT_CATEGORY_SERVICE + '/productlist',
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
                data

            }).then(function success(data) {
                deferred.resolve(data);
            }, function error(data) {
                deferred.reject(data);
            });
            return deferred.promise;
        };


        this.addToCartMethod = function (productData, userId) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: LOGIN_URL + '/initiateorder',
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
                data: { "orderitem": productData, "order_status": "init", "user_id": userId }

            }).then(function success(data) {
                deferred.resolve(data);

            }, function error(data) {
                deferred.reject(data);

            });

            return deferred.promise;
        };



        this.addToWishListMethod = function (userId, productName) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: SERVER_URL1 + '/wishlist',
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' },
                data: { "user_id": userId, "product_name": productName }

            }).then(function success(data) {
                deferred.resolve(data);

            }, function error(data) {
                deferred.reject(data);

            });

            return deferred.promise;
        };



    });	