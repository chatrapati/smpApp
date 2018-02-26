angular.module('shopMyTools.paymentsuccess', [])

    .controller('paymentsuccessCntrl',
        function ($scope, $rootScope, $state, $ionicPopup, $ionicLoading,
            $window, $ionicModal, checkoutService) {
				$scope.submitPayment = function () {
                    checkoutService.submitPayment(window.localStorage['finalOrderId'], window.localStorage['user_id']).then(function (data) {
                        if (data.data.status == "status changed") {
                            alert('success')
                        }
                    })
				}
				$scope.submitPayment();
			});