angular.module('shopMyTools.dashboardController', [])

    .controller('myOrderController', function ($scope, $rootScope, $state, myOrdersService, $ionicPopup, $ionicLoading, $ionicModal) {


        $scope.getOrders = function () {
            myOrdersService.myOrdersMethod(window.localStorage['user_id']).then(function (data) {
                // alert(JSON.stringify(data))

                if (data.data.status == 'success') {
                    $scope.myOrdersList = data.data.order_info;
                }
            })
        };
        $scope.getOrders();

        $scope.gotoOrderDetails = function (orderId) {
            window.localStorage['orderId'] = orderId;
            $scope.orderId = orderId;
            myOrdersService.completeOrdersMethod(window.localStorage['orderId']).then(function (data) {
                if (data.data.status == 'success') {
                    $rootScope.orderitems = [];
                    $rootScope.orderId = window.localStorage['orderId'];
                    $rootScope.taxAmount = data.data.user_info.tax_amount;
                    $rootScope.grandTotal = data.data.user_info.grand_total;
                    $rootScope.custDetails = data.data.user_info.cust_details;
                    $rootScope.status = $rootScope.custDetails.status;
                    $rootScope.shippingaddress = data.data.user_info.cust_details.shippingaddress;
                    $rootScope.billingaddress = data.data.user_info.cust_details.billingaddress;
                    $rootScope.shippingtype = $rootScope.custDetails.shippingtype;
                    $rootScope.discountAmt = $rootScope.custDetails.discount_amount;
                    $rootScope.paymenttype = $rootScope.custDetails.paymenttype;
                    $rootScope.orderDetails = data.data.user_info.order_data;

                }

            });
            $scope.modal.show();

        }
        $ionicModal.fromTemplateUrl('templates/orderDetailsModel.html', {
            scope: $scope,
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.closePopup = function () {
            $scope.modal.hide();
        }

    })

    .controller('viewOrderDetailsCntrl', function ($scope, $rootScope, $state, $ionicPopup, $ionicLoading, $ionicModal, myOrdersService) {
        //  alert('ok');

        $scope.getMyOrderDetails = function () {
            myOrdersService.completeOrdersMethod(window.localStorage['orderId']).then(function (data) {
                if (data.data.status == 'success') {
                    $rootScope.orderitems = [];
                    $rootScope.orderId = window.localStorage['orderId'];
                    $rootScope.taxAmount = data.data.user_info.tax_amount;
                    $rootScope.grandTotal = data.data.user_info.grand_total;
                    $rootScope.custDetails = data.data.user_info.cust_details;
                    $rootScope.status = $rootScope.custDetails.status;
                    //  alert($rootScope.status)
                    $rootScope.shippingaddress = data.data.user_info.cust_details.shippingaddress;
                    $rootScope.name = $rootScope.shippingaddress.firstname;
                    // $rootScope.shippingaddress = $rootScope.custDetails.shippingaddress;
                    $rootScope.billingaddress = data.data.user_info.cust_details.billingaddress;
                    $rootScope.shippingtype = $rootScope.custDetails.shippingtype;
                    $rootScope.discountAmt = $rootScope.custDetails.discount_amount;
                    $rootScope.paymenttype = $rootScope.custDetails.paymenttype;
                    $rootScope.orderDetails = data.data.user_info.order_data;

                }

            });
        };
        $scope.getMyOrderDetails();


    })