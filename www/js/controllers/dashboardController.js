angular.module('shopMyTools.dashboardController', [])

    .controller('myOrderController', function ($scope, $rootScope, $state, myOrdersService, $ionicPopup, $ionicLoading, $ionicModal) {
        $scope.myOrdersList = [];
        $scope.pendingOrderList = [];
        $scope.invoiceOrderList = [];
        $scope.cancelOrderList = [];

        $scope.getOrders = function () {
            $ionicLoading.show({
                template: 'Loading...'
            });
            myOrdersService.myOrdersMethod(window.localStorage['user_id']).then(function (data) {
                $ionicLoading.hide();
                if (data.data.status == 'success') {
                    $scope.myOrdersList = data.data.order_info;
                    for (var i = 0; i <= $scope.myOrdersList.length; i++) {
                        if ($scope.myOrdersList[i].status == 'Pending') {
                            $scope.pendingOrderList.push($scope.myOrdersList[i])
                        }
                        if ($scope.myOrdersList[i].status == 'Complete') {
                            $scope.invoiceOrderList.push($scope.myOrdersList[i])
                        }
                        if ($scope.myOrdersList[i].status == 'Cancel') {
                            $scope.cancelOrderList.push($scope.myOrdersList[i])
                        }
                    }
                }
            })
        };
        $scope.getOrders();


        // $scope.getInvoiceOrders = function () {
        //     myOrdersService.getInvoiceordersList(window.localStorage['user_id']).then(function (data) {
        //         if (data.data.status == 'success') {
        //             $scope.invoiceOrderlist = data.data.user_info;
        //         }
        //     })
        // };

        // $scope.getPendingOrders = function () {
        //     myOrdersService.getPendingOrdersList(window.localStorage['user_id']).then(function (data) {
        //         if (data.data.status == 'success') {
        //             $scope.pendingOrdersList = data.data.user_info;
        //         }
        //     })
        // };



        $scope.gotoOrderDetails = function (orderId) {
            window.localStorage['orderId'] = orderId;
            $scope.orderId = orderId;
            $ionicLoading.show({
                template: 'Loading...'
            });
            myOrdersService.completeOrdersMethod(window.localStorage['orderId']).then(function (data) {
                $ionicLoading.hide();
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

        $scope.Pendingactive = true;
        $scope.Invoiceactive = false;
        $scope.Cancelactive = false;
        //  $scope.getPendingOrders();

        $scope.getOrdersList = function (orderType) {
            if (orderType == 'pending') {
                $scope.Pendingactive = true;
                $scope.Invoiceactive = false;
                $scope.Cancelactive = false;
                // $scope.getPendingOrders();
            } else if (orderType == 'invoice') {
                $scope.Pendingactive = false;
                $scope.Invoiceactive = true;
                $scope.Cancelactive = false;
                // $scope.getInvoiceOrders();
            } else if (orderType == 'cancel') {
                $scope.Pendingactive = false;
                $scope.Invoiceactive = false;
                $scope.Cancelactive = true;
                //  $scope.getOrders();
            }

        }

        $scope.cancelOrder = function (orderId) {
            $ionicLoading.show({
                template: 'Loading...'
            });
            myOrdersService.cancelOrderMethod(orderId).then(function (data) {
                $ionicLoading.hide();
                if (data.data.status == 'success') {
                    $scope.modal.hide();
                    $scope.getOrders();
                } else {
                    $ionicPopup.alert({
                        template: data.data.status,
                        title: 'Error!'
                    });
                }
            })
        }


    })

    .controller('viewOrderDetailsCntrl', function ($scope, $rootScope, $state, $ionicPopup, $ionicLoading, $ionicModal, myOrdersService) {
        //  alert('ok');

        $scope.getMyOrderDetails = function () {
            $ionicLoading.show({
                template: 'Loading...'
            });
            myOrdersService.completeOrdersMethod(window.localStorage['orderId']).then(function (data) {
                $ionicLoading.hide();
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

    .controller('wishListDetailsCntrl', function ($scope, $rootScope, $state, $ionicPopup, $ionicLoading, $ionicHistory, wishListService, $window, categoryService) {

        $scope.getWishList = function () {
            $ionicLoading.show({
                template: 'Loading...'
            });
            wishListService.getWishList(window.localStorage['user_id']).then(function (data) {
                $ionicLoading.hide();
                if (data.data.status == 'success') {
                    $rootScope.wishlistItems = data.data.prod_info;
                } else {
                    alert(data.data.status);
                }
            })
        };
        $scope.getWishList();

        $scope.addtoCartItems = function (productData) {
            $scope.productDataList = [];
            $scope.productDataList.push({ "productdescription": productData.upload_name, "qty": "1" })
            $ionicLoading.show({
                template: 'Loading...'
            });
            categoryService.addToCartMethod($scope.productDataList, window.localStorage['user_id']).then(function (data) {
                window.localStorage['orderId'] = data.data.orderid;
                $ionicLoading.hide();
                if (data.data.status == 'item added to cart') {
                    $ionicPopup.alert({
                        template: 'Added to Cart Successfully!',
                        title: 'Success!'
                    });
                } else if (data.data.status == 'item added to cart..') {
                    $ionicPopup.alert({
                        template: 'Added to Cart Successfully!',
                        title: 'Success!'
                    });
                }
                else if (data.data.status == 'out off stock') {
                    $ionicPopup.alert({
                        template: 'Out Off Stock!',
                        title: 'Sorry!'
                    });
                }
            });
        }


        $scope.deleteWishlistItem = function (product) {
            $ionicLoading.show({
                template: 'Loading...'
            });
            wishListService.deleteWishlistItem(window.localStorage['user_id'], product.upload_name).then(function (data) {
                $ionicLoading.hide();
                if (data.data.status == 'product removed successfully') {
                    $ionicPopup.alert({
                        template: 'Removed successfully!',
                        title: 'Success!'
                    });
                    $scope.getWishList();
                } else {
                    alert(data.data.status)
                }
            })
        }



        $scope.goback = function () {
            $state.go('app.home');
            //  $window.history.go(-1);
        }


    })


    .controller('viewCartItemsListCntrl', function ($scope, $rootScope, $state, $ionicPopup, $ionicLoading, $window, viewCartItemsService, categoryService) {

        $scope.getCartItemsList = function () {
            $ionicLoading.show({
                template: 'Loading...'
            });
            viewCartItemsService.getCartItemsList(window.localStorage['user_id']).then(function (data) {
                $ionicLoading.hide();
                if (data.data.status == 'success') {
                    $scope.cartItemsList = data.data.item_list;
                }

            })
        }

        $scope.getCartItemsList();




        $scope.addtocartDetails = function (productDataName, quantity) {
           // alert('in');
            $scope.productDataListData = [];
            if (quantity > 1) {
                $scope.productDataListData.push({ "productdescription": productDataName, "qty": quantity })
                $ionicLoading.show({
                    template: 'Loading...'
                });
                categoryService.addToCartMethod($scope.productDataListData, window.localStorage['user_id']).then(function (data) {
                    window.localStorage['orderId'] = data.data.orderid;
                    $ionicLoading.hide();
                    if (data.data.status == 'item added to cart') {
                        $scope.getCartItemsList();

                    } else if (data.data.status == 'item added to cart..') {
                        $scope.getCartItemsList();
                    }
                    else if (data.data.status == 'out off stock') {
                        $scope.getCartItemsList();
                    }
                });
            }
        }




        $scope.goback = function () {
            $state.go('app.home');
            //  $window.history.go(-1);
        }

    })