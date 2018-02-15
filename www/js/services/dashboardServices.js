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
    
    })

