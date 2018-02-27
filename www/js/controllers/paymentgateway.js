angular.module('shopMyTools.paymentsuccess', [])

    .controller('paymentsuccessCntrl',
        function ($scope, $rootScope, $state, $ionicPopup, $ionicLoading,
            $window, $ionicModal, checkoutService) {
                $scope.finalOrderId=window.localStorage['finalOrderId'];
				$scope.submitPayment = function () {
                    checkoutService.submitPayment($scope.finalOrderId, window.localStorage['user_id']).then(function (data) {
                        if (data.data.status == "status changed") {
                          //  alert('success')
                        }
                    })
				}
                $scope.submitPayment();
                
                $scope.goback = function () {
                     $state.go('app.home');   
                    //$window.history.go(-1);
                  }
			});