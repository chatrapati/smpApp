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
    })

    .service('reviews_service', function ($q, $http, PRODUCT_DETAIL_SERVICE) {

        this.reviewsMethod = function (data,rating,prod_desc,user_id) {
    
            var deferred = $q.defer();
    
            $http({
                method: 'POST',
                url: PRODUCT_DETAIL_SERVICE+'/reviews',			
                headers: { 'Content-Type': 'application/json' ,"secret_key":"4r5t@W",'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
                data:{"prod_desc": prod_desc,"review":data.summary,"rating":rating,"mobile_number":"91"+data.mobile,"rating_comments":data.review,"user_name":data.name,"user_id":user_id}
                
            }).then(function success(data) {
                deferred.resolve(data);
            }, function error(data) {
                deferred.reject(data);
            });
            return deferred.promise;
        };	
    });	