angular.module('shopMyTools.ckeckoutController', [])

    .controller('ckeckoutCntrl', function ($scope, $rootScope, $state, $ionicPopup, $ionicLoading, $window, $ionicModal, checkoutService) {

        $scope.showshippingDiv = true;
        $scope.showBillingAddressDiv = false;
        $scope.showPaymentTypeDiv = false;
        $scope.showOrderDetailDiv = true;
        $scope.checkoutData = {};

        $scope.shippingAddress = JSON.parse(localStorage.getItem('shippingAddressInfo'));
        $scope.billingAddress = JSON.parse(localStorage.getItem('billingAddressInfo'));


        $scope.getPickupDetails = function (getPincodeData) {
            $scope.customerMobile = getPincodeData.mobile;
            checkoutService.getPincodeStatus(getPincodeData.postal_code).then(function (data) {

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
            checkoutService.getDealersList(latLongArray).then(function (data) {
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
            $scope.modal.hide();
            $scope.showshippingDiv = false;
            $scope.showBillingAddressDiv = true;
        }

        $scope.saveBillingAddress = function (billingAddress) {
            $scope.billingAddressData = billingAddress;
            $scope.showBillingAddressDiv = false;
            $scope.showPaymentTypeDiv = true;
        }

        $scope.savePaymentType = function (paymentType) {
            $scope.paymentType = paymentType;
            $scope.showOrderDetailDiv = true;
            $scope.showBillingAddressDiv = false;
            $scope.showPaymentTypeDiv = false;

        }


        $scope.goback = function () {
            //  $state.go('app.home');
            $window.history.go(-1);
        }

        $scope.status = "Pending";

        $scope.orderItemArray = [];



        $rootScope.cartItemsList.forEach(function (cartItem) {

            $scope.orderItemArray.push({

                "sno": "", "productdescription": cartItem.productdescription, "qty": cartItem.qty,

                "unitprice": cartItem.offer_price, "enduser_price": "", "total": JSON.stringify(cartItem.qty * cartItem.offer_price),

                "tax": cartItem.tax, "tax_amount": cartItem.tax_amount, "sub_total": cartItem.sub_total

            })

        });

        $scope.totalquantity = $rootScope.cartItemsList.length;
        $scope.checkoutProcess = function () {


            $scope.finalCheckoutData = {

                "status": $scope.status,
                "shop": $scope.shop,
                "alt_mobile": $scope.customerMobile,
                "customermobile": "91" + $scope.billingAddress.mobile,

                "totalamount": JSON.stringify($rootScope.grand_total),

                "orderitems": $scope.orderItemArray,

                "cupon_id": "",

                "discount": "0",

                "billingaddress": [$scope.billingAddressData],

                "shippingaddress": [$scope.shippingAddress],

                "shippingtype": $scope.checkoutData.shippingType,

                "totalquantity": JSON.stringify($scope.totalquantity),

                "paymenttype": $scope.paymentType,

                "total_items": JSON.stringify($scope.totalquantity),

                "user_id": window.localStorage['user_id']
            }

            checkoutService.saveOrderMethod($scope.finalCheckoutData).then(function (data) {



                //alert(JSON.stringify(data))

                if (data.data.status == 'data saved') {

                    $scope.finalOrderId = data.data.orderid;

                    window.localStorage['finalOrderId'] = $scope.finalOrderId;

                    // $scope.txnId = window.localStorage['finalOrderId'];



                    if ($scope.paymentType == 'cashondelivery') {

                        window.location.href = "success.html";

                    }

                }



            })

        }


    })