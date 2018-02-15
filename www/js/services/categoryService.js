
angular.module('shopMyTools.categoryService', [])
.service('categoryService', function ($q, $http, PRODUCT_CATEGORY_SERVICE) {

    this.getAllCategoriesOfProduct = function ($scope, $rootScope) {
        var deferred = $q.defer();
        var data = angular.toJson($scope.getCategoryProductData);
		
        $http({
            method: 'POST',
            url: PRODUCT_CATEGORY_SERVICE +'/productlist',
            headers: {'Content-Type': 'application/json','Content-type': 'application/x-www-form-urlencoded;charset=utf-8','secret_key':'4r5t@W'},
			data
           
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});	