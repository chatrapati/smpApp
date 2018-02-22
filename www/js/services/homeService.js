angular.module('shopMyTools.homeService', [])



    .service('homePageService', function ($q, $http, SERVER_URL) {
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

    })

    .service('allOffersService', function ($q, $http, SERVER_URL) {
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

    })

    .service('allNewArrivalsService',function($q, $http,SERVER_URL){
        this.allNewArrivalsMethod = function (subCatObj) {
                var deferred = $q.defer();
    
                $http({
                    method: 'GET',
                    url:SERVER_URL+'/newarrivalcats?upload_subcategory='+subCatObj,
                    headers: {'Content-Type': 'application/json','Content-type': 'application/x-www-form-urlencoded;charset=utf-8','secret_key':'4r5t@W'}		
                    
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
