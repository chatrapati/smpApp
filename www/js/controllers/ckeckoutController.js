angular.module('shopMyTools.ckeckoutController', [])

    .controller('ckeckoutCntrl', 
    function ($scope, $rootScope, $state, $ionicPopup, $ionicLoading,
         $window, $ionicModal, checkoutService, viewCartItemsService,getpayuDetailsService,$cordovaInAppBrowser) {

        $scope.showshippingDiv = true;
        $scope.showBillingAddressDiv = false;
        $scope.showPaymentTypeDiv = false;
        $scope.showOrderDetailDiv = false;
        $scope.checkoutData = {};

        $scope.shippingAddress = JSON.parse(localStorage.getItem('shippingAddressInfo'));
        $scope.billingAddress = JSON.parse(localStorage.getItem('billingAddressInfo'));
        $scope.userInfo = JSON.parse(localStorage.getItem('userInfo'));


        //  $scope.customermobile = window.localStorage['mobile'];

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
            $scope.Addressmodal.hide();
            if ($scope.sameAsShipping == true) {
                $scope.billingAddress = editShippingAdd;
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
                $scope.showBillingAddressDiv = true;
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
            $scope.showPaymentTypeDiv = true;
        }

        $scope.savePaymentType = function (paymentType) {
            $scope.paymentType = paymentType;
            $scope.showOrderDetailDiv = true;
            $scope.showBillingAddressDiv = false;
            $scope.showPaymentTypeDiv = false;

        }

        $scope.getPayuDetails = function () {

            getpayuDetailsService.getpayuDetailsMethod().then(function (data) {
                if (data.data.status == 'payu data') {

                    $scope.payuData = data.data.data;

                    window.localStorage['merchant_key']  = $scope.payuData.merchant_id;

                    window.localStorage['salt_key']  = $scope.payuData.salt_key;

                }

            })

        }

        $scope.getPayuDetails();

        window.localStorage['firstname'] = $scope.userInfo.firstname;
        window.localStorage['email'] = $scope.userInfo.email;
        window.localStorage['phone']= window.localStorage['mobile'];
      
     //  window.localStorage['amount'] = $rootScope.grand_total;
     

    //    $scope.firstname = $scope.userInfo.firstname;
    //    $scope.email = $scope.userInfo.email;
    //    $scope.phone= window.localStorage['mobile'].substr(2);
   
    //  $scope.amount = $rootScope.grand_total;

    //  $scope.merchant_key = window.localStorage['merchant_key'];

    //  $scope.salt_key = window.localStorage['salt_key'];
    
    //   $scope.txnId = window.localStorage['finalOrderId'];

       $scope.getPayuPageDetails = function(){
           //alert('1')
        $scope.firstname =  window.localStorage['firstname'] ;
        $scope.email = window.localStorage['email'];
       $scope.phone =  window.localStorage['phone'];
       $scope.merchant_key = window.localStorage['merchant_key'];

      $scope.salt_key = window.localStorage['salt_key'];

      $scope.txnId = window.localStorage['finalOrderId'];

      $scope.amount =  window.localStorage['amount'];
      console.log($scope.firstname)
      console.log($scope.email)
      console.log($scope.phone)
      console.log($scope.merchant_key)
      console.log($scope.salt_key)
      console.log($scope.txnId)
      console.log($scope.amount)
      console.log($scope.merchant_key + '|' +  $scope.txnId + '|' + $scope.amount  + '|' + 'propertyInfo' + '|' +$scope.firstname + '|' +$scope.email + '|||||||||||' +  $scope.salt_key)
       }

       if(document.URL == 'http://localhost:8100/#/payu'){
        $scope.getPayuPageDetails();
       }
        $scope.payuMoneyFunc = function ($location, $sce) {

           // window.localStorage['txnId'] = window.localStorage['finalOrderId'];
           

            $scope.string =  $scope.merchant_key + '|' +  $scope.txnId + '|' + $scope.amount  + '|' + 'propertyinfo' + '|' +$scope.firstname + '|' +$scope.email + '|||||||||||' +  $scope.salt_key;

            $scope.encrypttext = sha512($scope.string);

            $scope.hash = $scope.encrypttext;

            console.log($scope.string)

            console.log($scope.hash)

            // cordova.InAppBrowser.open('https://secure.payu.in/_payment?merchant_key='+$scope.merchant_key+'&txnId='+$scope.txnId+'&amount='+$rootScope.amount+'&productinfo=productinfo&firstname='+$scope.firstname+'&email='+$scope.email+'&salt_key='+$scope.salt_key)
          



        }


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




      //  $scope.totalquantity = $rootScope.cartItemsList.length;
        $scope.checkoutProcess = function () {
            var options = {
                location: 'yes',
                clearcache: 'no',
                toolbar: 'no'
              };
            if($scope.paymentType == 'online'){
               // $cordovaInAppBrowser.open('http://localhost:8100/#/payu',options)
               $state.go('payu')
             }

            $scope.finalCheckoutData = {

                "status": $scope.status,
                "shop": $scope.shop,
                "alt_mobile": "91" + $scope.customerMobile,
                "customermobile": window.localStorage['mobile'],

                "totalamount": JSON.stringify($rootScope.grand_total),

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

                "user_type": "mobile"
            }
            $ionicLoading.show({
                template: 'Loading...'
            });
            checkoutService.saveOrderMethod($scope.finalCheckoutData).then(function (data) {
                $ionicLoading.hide();
                if (data.data.status == 'data saved') {
                    $scope.finalOrderId = data.data.orderid;
                    window.localStorage['finalOrderId'] = $scope.finalOrderId;

                   
                    $scope.submitPayment();
                }

            })

            $scope.submitPayment = function () {
                checkoutService.submitPayment(window.localStorage['finalOrderId'], window.localStorage['user_id']).then(function (data) {
                    if (data.data.status == "status changed") {
                        if($scope.paymentType == 'cashondelivery'){
                            $ionicPopup.alert({
                                template: window.localStorage['finalOrderId'],
                                title: 'Sucess!'
                            });
                        $state.go('app.home');
                        }
                    }
                })
            }
        }


    })