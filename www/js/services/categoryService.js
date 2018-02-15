
angular.module('shopMyTools.categoryService', [])
.service('product_categories_service', function ($q, $http,PRODUCT_CATEGORY_SERVICE) {

    this.getAllCategoriesOfProduct = function (categoryName,subCategoryName,fromVal,toVal) {
        var deferred = $q.defer();
		
        $http({
            method: 'POST',
            url: PRODUCT_CATEGORY_SERVICE+'/productlist',
            headers: {'Content-Type': 'application/json','Content-type': 'application/x-www-form-urlencoded;charset=utf-8','secret_key':'4r5t@W'},
			data:{"category":categoryName,"subcategory":[subCategoryName], "from":fromVal ,"to":toVal } 
           
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});	