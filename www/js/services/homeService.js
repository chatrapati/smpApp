angular.module('shopMyTools.homeService', [])



    .service('homePageService', function ($q, $http, SERVER_URL, LOGIN_URL) {
        this.homePageMethod = function () {
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

        this.allOffersMethod = function (subCatObj) {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: SERVER_URL + '/offerscats?upload_subcategory=' + subCatObj,
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }

            }).then(function success(data) {
                deferred.resolve(data);

            }, function error(data) {
                deferred.reject(data);

            });

            return deferred.promise;
        };


        this.allNewArrivalsMethod = function (subCatObj) {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: SERVER_URL + '/newarrivalcats?upload_subcategory=' + subCatObj,
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }

            }).then(function success(data) {
                deferred.resolve(data);

            }, function error(data) {
                deferred.reject(data);

            });

            return deferred.promise;
        };


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

    .service('searchProductsService', function ($q, $http, SERVER_URL1) {
        this.searchProductsMoreMethod = function (productName) {
            var deferred = $q.defer();
    
            $http({
                method: 'GET',
                url: SERVER_URL1 + '/matchprod?product_name=' + productName,
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }
    
            }).then(function success(data) {
                deferred.resolve(data);
    
            }, function error(data) {
                deferred.reject(data);
    
            });
    
            return deferred.promise;
        };
    
    })

    .service('searchProductsMoreService', function ($q, $http, SERVER_URL1) {
        this.searchProductsMoreMethod = function (productName) {
            var deferred = $q.defer();
    
            $http({
                method: 'GET',
                url: SERVER_URL1 + '/searchproduct?product_name=' + productName,
                headers: { 'Content-Type': 'application/json', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'secret_key': '4r5t@W' }
    
            }).then(function success(data) {
                deferred.resolve(data);
    
            }, function error(data) {
                deferred.reject(data);
    
            });
    
            return deferred.promise;
        };
    
    })

