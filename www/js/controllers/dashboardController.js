angular.module('shopMyTools.dashboardController', [])

    .controller('myOrderController', function ($scope, $rootScope, $state, myOrdersService, $ionicPopup, $ionicLoading, $ionicModal, $window) {


        $scope.getOrders = function () {

            $scope.myOrdersList = [];
            $scope.pendingOrderList = [];
            $scope.invoiceOrderList = [];
            $scope.cancelOrderList = [];

            $ionicLoading.show({
                template: 'Loading...'
            });
            myOrdersService.myOrdersMethod(window.localStorage['user_id']).then(function (data) {
                $ionicLoading.hide();
                if (data.data.status == 'success') {
                    $scope.myOrdersList = data.data.order_info;

                    //alert(JSON.stringify($scope.myOrdersList))

                    $scope.myOrdersList.forEach(function (orders) {
                        if (orders.status == 'Accepted') {
                            $scope.pendingOrderList.push(orders)
                        } else if (orders.status == 'Complete') {
                            $scope.invoiceOrderList.push(orders)
                        } else if (orders.status == 'Cancel') {
                            $scope.cancelOrderList.push(orders)
                        }
                    });
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

        $scope.goback = function () {
           // $state.go('app.home');
              $window.history.go(-1);
        }

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
            $scope.getOrders();
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

            var confirmPopup = $ionicPopup.confirm({
                title: 'SMT',
                template: 'Are you sure you want to cancel this product?'
            });
            confirmPopup.then(function (res) {
                if (res) {
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
                } else {
                    // console.log('You are not sure');
                }
            });



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

    .controller('wishListDetailsCntrl', function ($scope, $rootScope, $state, $ionicPopup, $ionicLoading, $ionicHistory, wishListService, $window, categoryService, viewCartItemsService) {

        $scope.getCartItemsList = function () {
            $ionicLoading.show({
                template: 'Loading...'
            });
            viewCartItemsService.getCartItemsList(window.localStorage['user_id']).then(function (data) {
                $ionicLoading.hide();
                if (data.data.status == 'success') {
                    $rootScope.cartItemsList = data.data.item_list;
                    $rootScope.grand_total = data.data.grand_total;
                    $rootScope.CartItemsCount = $rootScope.cartItemsList.length;
                } else if (data.data.status == 'no data available of this user') {
                    $rootScope.cartItemsList = [];
                    $rootScope.CartItemsCount = $rootScope.cartItemsList.length;
                }

            })
        }

        $scope.getWishList = function () {
            $ionicLoading.show({
                template: 'Loading...'
            });
            wishListService.getWishList(window.localStorage['user_id']).then(function (data) {
                $ionicLoading.hide();
                if (data.data.status == 'success') {
                    $rootScope.wishlistItems = data.data.prod_info;
                    $scope.wishListItemsCount = $rootScope.wishlistItems.length;
                } else {
                    alert(data.data.status);
                }
            })
        };
        $scope.getWishList();

        $scope.addtoCartItems = function (productData) {
            $scope.productDataList = [];

            $ionicLoading.show({
                template: 'Loading...'
            });

            if ($rootScope.CartItemsCount > 0) {
                $scope.productDataList = $rootScope.cartItemsList;
            }
            $scope.productDataList.push({ "productdescription": productData.upload_name, "qty": "1" });
            // $rootScope.CartItemsCount = $scope.productDataList.length;

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
            $scope.getCartItemsList();
        }


        $scope.deleteWishlistItem = function (product) {

            var confirmPopup = $ionicPopup.confirm({
                title: 'SMT',
                template: 'Are you sure you want to delete this product?'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    $ionicLoading.show({
                        template: 'Loading...'
                    });
                    wishListService.deleteWishlistItem(window.localStorage['user_id'], product.upload_name).then(function (data) {
                        $ionicLoading.hide();
                        if (data.data.status == 'product removed successfully') {
                            // $ionicPopup.alert({
                            //     template: 'Removed successfully!',
                            //     title: 'Success!'
                            // });
                            $scope.getWishList();
                        } else {
                            alert(data.data.status)
                        }
                    })
                } else {
                    // console.log('You are not sure');
                }
            });

        }

        $scope.getProductDetails = function (productObj) {
            window.localStorage['productName'] = productObj.upload_name;
            $state.go("productDetail_page")
        }

        $scope.gotoCartPage = function () {
            $state.go('cart_page');
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
                    $rootScope.cartItemsList = data.data.item_list;
                    $rootScope.grand_total = data.data.grand_total;
                    $rootScope.CartItemsCount = $rootScope.cartItemsList.length;
                    $rootScope.totalprice = 0;
                    $rootScope.totaltaxAmout = 0;
                    for (var i = 0; i < $rootScope.cartItemsList.length; i++) {
                        var offerprice = $rootScope.cartItemsList[i].offer_price;
                        var taxAmount =$rootScope.cartItemsList[i].tax_amount;
                        $rootScope.totalprice += JSON.parse(offerprice * $rootScope.cartItemsList[i].qty) ;
                        $rootScope.totaltaxAmout += JSON.parse(taxAmount) ; 
                       // alert($rootScope.totalprice);
                    }

                } else if (data.data.status == 'no data available of this user') {
                    $rootScope.cartItemsList = [];
                    $rootScope.CartItemsCount = $rootScope.cartItemsList.length;
                }

            })
        }

        $scope.getCartItemsList();

        // var count = 0;
        $scope.increment = function (obj) {
            $scope.qty = JSON.parse(obj.qty)
            $scope.qty += 1;
            obj.qty = JSON.stringify($scope.qty);
            $scope.addtocartDetails(obj);
        }

        $scope.decrement = function (obj) {

            if (obj.qty > 1) {
                $scope.qty = JSON.parse(obj.qty)
                $scope.qty -= 1;
                obj.qty = JSON.stringify($scope.qty);
                $scope.addtocartDetails(obj);
            }



        }

        $scope.addtocartDetails = function (cartObj) {
            if (cartObj.qty >= 1) {
                $ionicLoading.show({
                    template: 'Loading...'
                });

                $rootScope.cartItemsList.forEach(function (cartItem) {
                    if (cartObj.productdescription == cartItem.productdescription) {
                        cartItem.qty = cartObj.qty;
                    }
                })


                $rootScope.CartItemsCount = $rootScope.cartItemsList.length;
                categoryService.addToCartMethod($rootScope.cartItemsList, window.localStorage['user_id']).then(function (data) {

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




        $scope.addtoWishList = function (productData) {
            $ionicLoading.show({
                template: 'Loading...'
            });
            categoryService.addToWishListMethod(window.localStorage['user_id'], productData.productdescription).then(function (data) {
                $ionicLoading.hide();
                if (data.data.status == 'product saved successfully') {
                    $ionicPopup.alert({
                        template: 'Added to Wish List Successfully!!',
                        title: 'Success!'
                    });
                } else {
                    $ionicPopup.alert({
                        template: data.data.status,
                        title: 'Sorry!'
                    });
                }

            })
        }

        $scope.deleteCartItem = function (item) {

            var confirmPopup = $ionicPopup.confirm({
                title: 'SMT',
                template: 'Are you sure you want to delete this product from cart items?'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    $ionicLoading.show({
                        template: 'Loading...'
                    });
                    viewCartItemsService.deleteCartItem(window.localStorage['user_id'], item.productdescription).then(function (data) {
                        $ionicLoading.hide();
                        if (data.data.status == 'product deleted successfully') {
                            $scope.getCartItemsList();
                        }
                    })
                } else {
                    // console.log('You are not sure');
                }
            });



        }





        $scope.gotoCheckout = function () {
            // alert(item.tax_amount);
            $state.go('shipping&billing_page');
        }



        $scope.goback = function () {
            // $state.go('app.home');
            $window.history.go(-1);
        }

    })