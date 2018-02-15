angular.module('shopMyTools.filterController', [])

.controller('filterController', function ($scope, $state, $rootScope) {

    $rootScope.toggleCategory = function(category) {    
      if ($scope.isGroupShown(category)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = category;
      }
    };
    $scope.isGroupShown = function(category) {
      return $scope.shownGroup == category;
    };
      
    $scope.categoryList = [];
        
    $scope.categoryList[0] = {
      name: 'First',
       items: [
        { title: 'Sample1' },
        { title: 'Sample2' },
        { title: 'Sample3' },
        { title: 'Sample4', id: 6, context: 'sanpm5' }      
       ]
     };
        
    $scope.categoryList[1] = {
      name: 'Second',
    icon:'fa fa-line-chart',
     // image: 'investment',
     items: [
      { title: 'Sample1' },
      { title: 'Sample2' },
      { title: 'Sample3' },
      { title: 'Sample4'}      
     ]
    };
        
    

});