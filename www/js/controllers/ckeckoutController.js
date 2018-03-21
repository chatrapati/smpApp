angular.module('shopMyTools.ckeckoutController', [])

    .controller('ckeckoutCntrl',
        function ($scope, $rootScope, $state, $ionicPopup, $ionicLoading,
            $window, $ionicModal, checkoutService, viewCartItemsService, getpayuDetailsService, $cordovaInAppBrowser, getCouponService) {

            //Footer start
            $scope.gotoRespectivePage = function (page) {
                if (page == 'home') {
                    $state.go('app.home');
                } else if (page == 'tracking') {
                    $cordovaInAppBrowser.open('http://care.shopmytools.com/cust_order_tracking');
                }
            }
            //Footer End


            $scope.showshippingDiv = true;
            $scope.showBillingAddressDiv = false;
            $scope.showPaymentTypeDiv = false;
            $scope.showOrderDetailDiv = false;
            $scope.checkoutData = {};
            $scope.getPincodeData = {};

            $scope.shippingAddress = JSON.parse(localStorage.getItem('shippingAddressInfo'));
            $scope.billingAddress = JSON.parse(localStorage.getItem('billingAddressInfo'));
            $scope.userInfo = JSON.parse(localStorage.getItem('userInfo'));
            $scope.gst_number = window.localStorage['gst_number'];
            $scope.customerMobile = window.localStorage['mobile'];
            $scope.getPincodeData.mobile = window.localStorage['mobile'];
            $scope.getPincodeData.gst_number = window.localStorage['gst_number'];

            $scope.shippingAddressLength = Object.keys($scope.shippingAddress).length;
            $scope.billingAddressLength = Object.keys($scope.billingAddress).length;



            $scope.editAddress = function () {
                $scope.Addressmodal.show();
            }

            $ionicModal.fromTemplateUrl('templates/use_current_location_page.html', {
                scope: $scope,
            }).then(function (modal) {
                $scope.Addressmodal = modal;
            });

            $scope.closeAddPopup = function () {
                $scope.Addressmodal.hide();
            }

            $ionicModal.fromTemplateUrl('templates/editBillingAddressModal.html', {
                scope: $scope,
            }).then(function (modal) {
                $scope.billingAddressmodal = modal;
            });

            $scope.closeBillAddPopup = function () {
                $scope.billingAddressmodal.hide();
            }

            $scope.gotoEditBillingAddress = function () {
                $scope.billingAddressmodal.show();
            }


            $scope.saveEditShippingAddress = function (editShippingAdd) {
                $scope.shippingAddress = editShippingAdd;
                $scope.sameAsShipping = editShippingAdd.checked;
                $scope.shippingAddressLength = Object.keys($scope.shippingAddress).length;
                $scope.Addressmodal.hide();
                if ($scope.sameAsShipping == true) {
                    $scope.billingAddress = editShippingAdd;
                    $scope.billingAddressLength = Object.keys($scope.billingAddress).length;
                }
            }


            $scope.saveShippingAddress = function () {

                if ($scope.sameAsShipping == true) {
                    $scope.showshippingDiv = false;
                    $scope.showBillingAddressDiv = false;
                    $scope.showPaymentTypeDiv = true;
                } else {
                    $scope.showshippingDiv = false;
                    $scope.showBillingAddressDiv = true;
                }
            }


            $scope.saveEditBillingAddress = function (editBillingAddressData) {
                $scope.billingAddress = editBillingAddressData;
                $scope.billingAddressmodal.hide();
            }


            $scope.getPickupDetails = function (getPincodeData) {
                $scope.gst_number = getPincodeData.gst_number;
                $scope.customerMobile = getPincodeData.mobile;
                $ionicLoading.show({
                    template: 'Loading...'
                });
                checkoutService.getPincodeStatus(getPincodeData.postal_code).then(function (data) {
                    $ionicLoading.hide();
                    if (data.data.status == 'Success') {
                        var geocoder = new google.maps.Geocoder();
                        geocoder.geocode({ 'address': JSON.stringify(getPincodeData.postal_code) }, function (results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                var latitude = results[0].geometry.location.lat();
                                var longitude = results[0].geometry.location.lng();

                                // alert("Latitude: " + latitude + "\nLongitude: " + longitude);

                                $scope.latLongArray = [];
                                $scope.latLongArray.push(latitude, longitude);
                                $scope.getDealersList($scope.latLongArray)

                            } else {

                                // alert("Request failed.")

                            }

                        });

                    } else {

                        alert('Enter valid PINCODE')

                    }

                })
            }


            $scope.getDealersList = function (latLongArray) {
                $ionicLoading.show({
                    template: 'Loading...'
                });
                checkoutService.getDealersList(latLongArray).then(function (data) {
                    $ionicLoading.hide();
                    if (data.data.status == 'success') {
                        $scope.dealersList = data.data.dealer_list;
                        $scope.modal.show();
                    } else {
                        alert(data.data.status);
                    }
                })
            }

            $ionicModal.fromTemplateUrl('templates/toolsShops_modal.html', {
                scope: $scope,
            }).then(function (modal) {
                $scope.modal = modal;
            });

            $scope.closePopup = function () {
                $scope.modal.hide();
            }


            $scope.saveDealerAddress = function (dealer) {
                //   $scope.dealerAddress = dealer;
                $scope.shop = dealer.shop_name;
            }

            $scope.gotoBillingAddressDetails = function () {
                if ($scope.shop != '' && $scope.shop != undefined) {
                    $scope.modal.hide();
                    $scope.showshippingDiv = false;
                    $scope.showBillingAddressDiv = false;
                    $scope.showOrderDetailDiv = true;
                } else {
                    $ionicPopup.alert({
                        template: 'Please Select Shop',
                        title: 'Alert!'
                    });
                }

            }

            $scope.saveBillingAddress = function (billingAddress) {
                $scope.billingAddress = billingAddress;
                $scope.showBillingAddressDiv = false;
                $scope.showOrderDetailDiv = true;
            }

            $scope.continueForPayment = function () {
                $scope.showOrderDetailDiv = false;
                $scope.showPaymentTypeDiv = true;
            }

            $scope.savePaymentType = function (paymentType) {
                $scope.paymentType = paymentType;
                // $scope.showOrderDetailDiv = false;
                // $scope.showBillingAddressDiv = false;
                // $scope.showPaymentTypeDiv = true;

            }

            $scope.getPayuDetails = function () {
                getpayuDetailsService.getpayuDetailsMethod().then(function (data) {
                    if (data.data.status == 'payu data') {

                        $scope.payuData = data.data.data;

                        window.localStorage['merchant_key'] = $scope.payuData.merchant_id;

                        window.localStorage['salt_key'] = $scope.payuData.salt_key;

                    }

                })

            }

            $scope.getPayuDetails();



            $scope.firstname = $scope.userInfo.firstname;
            $scope.email = $scope.userInfo.email;
            $scope.phone = window.localStorage['mobile'];

            $scope.amount = $rootScope.grand_total;

            $scope.merchant_key = window.localStorage['merchant_key'];



            $scope.txnId = window.localStorage['finalOrderId'];


            $scope.totalquantity = $rootScope.cartItemsList.length;




            $scope.goback = function () {
                //  $state.go('app.home');
                $window.history.go(-1);
            }

            $scope.status = "Accepted";

            $scope.orderItemArray = [];

            if ($rootScope.cartItemsList) {
                $rootScope.cartItemsList.forEach(function (cartItem) {
                    $scope.orderItemArray.push({
                        "sno": "", "productdescription": cartItem.productdescription, "qty": cartItem.qty,

                        "unitprice": cartItem.offer_price, "enduser_price": "", "total": JSON.stringify(cartItem.qty * cartItem.offer_price),

                        "tax": cartItem.tax, "tax_amount": cartItem.tax_amount, "sub_total": cartItem.sub_total

                    })

                });
            }
            //  alert(window.localStorage['mobile']);

            $rootScope.user_id = window.localStorage['user_id']

            $scope.checkoutProcess = function () {
                if ($rootScope.couponAmt) {
                    $rootScope.grand_total = JSON.stringify($rootScope.grand_total - $rootScope.couponAmt);
                }

                $scope.finalCheckoutData = {

                    "pic_alt_mobile": $scope.customerMobile,

                    "status": $scope.status,

                    "shop": $scope.shop,

                    "alt_mobile": $scope.customerMobile,

                    "customermobile": window.localStorage['mobile'],

                    "totalamount": $rootScope.grand_total,

                    "orderitems": $scope.orderItemArray,

                    "cupon_id": "",

                    "discount": "0",

                    "billingaddress": [$scope.billingAddress],

                    "shippingaddress": [$scope.shippingAddress],

                    "shippingtype": $scope.checkoutData.shippingType,

                    "totalquantity": JSON.stringify($scope.totalquantity),

                    "paymenttype": $scope.paymentType,

                    "total_items": JSON.stringify($scope.totalquantity),

                    "user_id": window.localStorage['user_id'],

                    "user_type": "mobile",

                    "gst_number": $scope.gst_number

                }


                if ($scope.shippingAddressLength == 0) {
                    $scope.finalCheckoutData.shippingaddress = [];
                }
                if ($scope.billingAddressLength == 0) {
                    $scope.finalCheckoutData.billingaddress = [];
                }

                $ionicLoading.show({
                    template: 'Loading...'
                });

                localStorage.setItem('shippingAddressInfo', JSON.stringify($scope.shippingAddress));
                localStorage.setItem('billingAddressInfo', JSON.stringify($scope.billingAddress));


                checkoutService.saveOrderMethod($scope.finalCheckoutData).then(function (data) {
                    $ionicLoading.hide();
                    if (data.data.status == 'data saved') {
                        $scope.finalOrderId = data.data.orderid;
                        $rootScope.finalOrderId = $scope.finalOrderId;
                        window.localStorage['finalOrderId'] = $scope.finalOrderId;

                        if ($scope.paymentType == 'payu') {
                            // onDeviceReadyTest()

                            var amt = parseInt($rootScope.grand_total);
                            var name = $scope.firstname;
                            var mobile = $scope.phone;
                            var email = window.localStorage['email'];
                            var bookingId = window.localStorage['finalOrderId'];
                            var productinfo = "Order for OR0293435435";
                            var key = window.localStorage['merchant_key'];
                            var salt = window.localStorage['salt_key'];
                            var string = key + '|' + bookingId + '|' + amt + '|' + productinfo + '|' + name + '|' + email + '|||||||||||' + salt;
                            var encrypttext = sha512(string);

                            var options = {
                                location: 'yes',
                                clearcache: 'yes',
                                toolbar: 'no'
                             };

                            var data = 'key=' + key
                                + '&txnid=' + bookingId
                                + '&amount=' + amt
                                + '&productinfo=' + productinfo
                                + '&firstname=' + name
                                + '&email=' + email
                                + '&phone=' + mobile
                                + '&hash=' + encrypttext;


                            var browser = $cordovaInAppBrowser.open('templates/payu.html?' + 'key=' + key
                                + '&txnid=' + bookingId
                                + '&amount=' + amt
                                + '&productinfo=' + productinfo
                                + '&firstname=' + name
                                + '&email=' + email
                                + '&phone=' + mobile
                                + '&hash=' + encrypttext, '_self', options);

                                window.addEventListener('loadstart', function(event) { 
                                    alert(event)
                                    var urlSuccessPage = "https://m.facebook.com/?refsrc=https%3A%2F%2Fwww.facebook.com%2F&_rdr";
                                    if (event.url == 'urlSuccessPage') {
                                    //$cordovaInAppBrowser.close();    
                                    }
                                  });

                        } else {
                            $scope.submitPayment();
                        }


                    }

                })


            }

            $scope.submitPayment = function () {
                checkoutService.submitPayment($scope.finalOrderId, window.localStorage['user_id']).then(function (data) {
                    if (data.data.status == 'status changed') {
                        if ($scope.paymentType == 'cashondelivery') {
                            $ionicPopup.alert({
                                template: $scope.finalOrderId,
                                title: 'Thanks for Shopping!! Your Order ID is'
                            });
                            $state.go('app.home')
                        }
                    }

                })

            }
            $scope.couponNotApplicable = 'false';
            $rootScope.couponApplied = 'false';
            $scope.couponShopMsg = 'false';

            $scope.getCouponText = function (coupon) {
                if (coupon.length == 0) {
                    $scope.couponNotApplicable = 'false';
                    $rootScope.couponApplied = 'false';
                    $scope.couponShopMsg = 'false';
                    $rootScope.couponAmt = 0;
                    //   $scope.viewCartItems();
                }
            }



            $scope.getCoupon = function (coupon) {
                //  alert(coupon)
                if (coupon == undefined) {
                    $ionicPopup.alert({
                        template: 'Please enter coupon',
                        title: 'Alert'
                    });
                } else {

                    if (coupon.charAt(0) == 'B' || coupon.slice(0, 2) == 'SC') {
                        $scope.itemList = $rootScope.cartItemsList;
                        if ($rootScope.couponApplied == 'false') {
                            getCouponService.brandBasedCouponMethod(coupon, window.localStorage['user_id'], $scope.itemList).then(function (data) {
                                if (data.data.status == 'cupon applicable') {
                                    $scope.couponData = data.data.coupon_details;
                                    $rootScope.couponApplied = 'true';
                                    $scope.couponNotApplicable = 'false';
                                    $rootScope.couponAmt = $scope.couponData.maxvalue;
                                    $rootScope.amount1 = $rootScope.grand_total - $rootScope.couponAmt;
                                    // localStorage.setItem('couponAmt', $rootScope.couponAmt);
                                } else {
                                    $scope.couponNotApplicable = 'true';
                                    $rootScope.couponApplied = 'false';
                                }
                            })
                        }
                    } else if (coupon.charAt(0) == 'M') {
                        if ($rootScope.couponApplied == 'false') {
                            getCouponService.maxPurchasedCouponMethod(coupon, window.localStorage['user_id'], $rootScope.grand_total).then(function (data) {
                                if (data.data.status == 'cupon applicable') {
                                    $scope.couponData = data.data.coupon_details;
                                    $rootScope.couponApplied = 'true';
                                    $scope.couponNotApplicable = 'false';
                                    $rootScope.couponAmt = $scope.couponData.maxvalue;
                                    // localStorage.setItem('couponAmt', $rootScope.couponAmt);
                                    //  alert(localStorage.getItem('couponAmt'))
                                    $rootScope.amount1 = $rootScope.grand_total - $rootScope.couponAmt;

                                } else {
                                    $scope.couponNotApplicable = 'true';
                                    $rootScope.couponApplied = 'false';
                                }
                            })
                        }
                    }

                    else {
                        localStorage.setItem('coupon', coupon);
                        if ($scope.couponShopMsg == 'false') {
                            getCouponService.getCouponMethod(coupon, window.localStorage['user_id']).then(function (data) {
                                // alert(JSON.stringify(data))
                                if (data.data.status == 'cupon applicable') {
                                    $scope.couponData = data.data.coupon_details;
                                    $rootScope.couponAmt = $scope.couponData.maxvalue;
                                    if ($scope.couponData.shop) {
                                        $rootScope.couponShop = $scope.couponData.shop;
                                        if ($scope.dealerAddress == $rootScope.couponShop) {
                                            $rootScope.amount1 = $rootScope.grand_total - $rootScope.couponAmt;
                                        } else {
                                            $rootScope.amount = $rootScope.grand_total;
                                        }
                                        localStorage.setItem('couponShop', $rootScope.couponShop);
                                        $scope.couponShopMsg = 'true';
                                        $rootScope.couponApplied = 'false';
                                        $scope.couponNotApplicable = 'false';
                                    } else {
                                        $rootScope.couponApplied = 'true';
                                        $scope.couponNotApplicable = 'false';
                                        $scope.couponShopMsg = 'false';
                                        $rootScope.amount1 = $rootScope.grand_total - $rootScope.couponAmt;
                                    }
                                    //   localStorage.setItem('couponAmt', $rootScope.couponAmt);
                                } else {
                                    $scope.couponNotApplicable = 'true';
                                    $rootScope.couponApplied = 'false';
                                    $scope.couponShopMsg = 'false';
                                }
                            })
                        }
                    }

                }


            }


        })

