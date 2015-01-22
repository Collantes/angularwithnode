app.controller('insCompanyCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data) {
    //initially set those objects to null to avoid undefined error
    
    $scope.dataList = function(){
        
        Data.get('getCompanyInfo').then(function (results) {
            //Data.toast(results);
            if (results.length > 0) {
               $scope.dataList = results;
            }
        });
    }
    $scope.dataList();
});