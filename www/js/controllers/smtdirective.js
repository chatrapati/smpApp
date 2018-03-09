angular.module('shopMyTools.smtdirective', [])

  // .filter('noFractionCurrency',
  // ['$filter', '$locale', function (filter, locale) {
  //     var currencyFilter = filter('currency');
  //     var formats = locale.NUMBER_FORMATS;
  //     return function (amount, currencySymbol) {
  //         var value = currencyFilter(amount, currencySymbol);
  //         var sep = value.indexOf(formats.DECIMAL_SEP);
  //         // console.log(formats.DECIMAL_SEP);
  //         if (amount >= 0) {
  //             return value.substring(0, sep);
  //         }
  //         return value.substring(0, sep) + ')';
  //     };
  // }]);


  .filter('range', function () {
    return function (input, total) {
      total = parseInt(total);
      for (var i = 0; i < total; i++)
        input.push(i);
      return input;
    };
  })

  .filter('image_jpg', function () {
    return function (text) {
      if (!text) {
        return text;
      }
      text1 = text.replace('thumbnail/gif', 'web');
      text2 = text1.replace('gif', 'jpg');
      text = text2;
      return text;
    };
  })

  .directive('fader', function ($timeout, $ionicGesture, $ionicSideMenuDelegate) {
    return {
      restrict: 'E',
      require: '^ionSideMenus',
      scope: true,
      link: function ($scope, $element, $attr, sideMenuCtrl) {
        $ionicGesture.on('tap', function (e) {
          $ionicSideMenuDelegate.toggleRight(true);
        }, $element);
        $ionicGesture.on('dragleft', function (e) {
          sideMenuCtrl._handleDrag(e);
          e.gesture.srcEvent.preventDefault();
        }, $element);
        $ionicGesture.on('dragright', function (e) {
          sideMenuCtrl._handleDrag(e);
          e.gesture.srcEvent.preventDefault();
        }, $element);
        $ionicGesture.on('release', function (e) {
          sideMenuCtrl._endDrag(e);
        }, $element);
        $scope.sideMenuDelegate = $ionicSideMenuDelegate;
        $scope.$watch('sideMenuDelegate.getOpenRatio()', function (ratio) {
          if (Math.abs(ratio) < 1) {
            $element[0].style.zIndex = "1";
            $element[0].style.opacity = 0.7 - Math.abs(ratio);
          } else {
            $element[0].style.zIndex = "-1";
          }
        });
      }
    }
  })

  .filter('reverse', function () {
    return function (items) {
      return items.slice().reverse();
    };
  });