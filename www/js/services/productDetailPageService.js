angular.module('shopMyTools.productDetailPageService', [])

    .service('product_detailed_service', function ($q, $http, PRODUCT_DETAIL_SERVICE) {

        this.getAllDetailsOfProduct = function (productName) {

            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: PRODUCT_DETAIL_SERVICE + '/productdetails?product_name=' + productName,
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', "secret_key": "4r5t@W" }

            }).then(function success(data) {
                deferred.resolve(data);
            }, function error(data) {
                deferred.reject(data);
            });
            return deferred.promise;
        };
    });	