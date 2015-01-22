app.controller('laborPriceCtrl', function($scope, $modal, $rootScope, $routeParams, $location, $http, Data) {
    //initially set those objects to null to avoid undefined error
    $scope.currentPage = 1;
    $scope.pageSize = 20;
    
    $scope.laborType = [{id:1,labor_type:'Install'},
        {id:2,labor_type:'Take Up'},
        {id:3,labor_type:'Move'},
        {id:4,labor_type:'Misc'},
        {id:5,labor_type:'Install Stairs'}];
    
    $scope.laborUnit = [{id:1,labor_unit:'Per Sq Ft'},
        {id:2,labor_unit:'Each'},
        {id:3,labor_unit:'Per Ln Ft'},
        {id:4,labor_unit:'Per Hour'}];
    $scope.dataList = function() {
        Data.get('laborList/' + $routeParams.id).then(function(results) {
            //Data.toast(results);
            if (results.length > 0) {
                $scope.dataList = results;
                $scope.company_id = $routeParams.id;
            }
            //$scope.labor_order = '-labor_type';
        })
    }
    //$scope.dataList();
    $scope.dataList = $scope.dataList();
     var $scopeParent = $scope;
     //console.log($scope.laborUnit);
   $scope.removeRecord = function(userId) {
         Data.get('deletelaborDetail/' + userId).then(function(results) {
             var index = getIndexOf($scopeParent.dataList,userId,"id");
             $scopeParent.dataList.splice(index,1);
             Data.toast(results);
        })
    };  
    
    // Modal: called by edit(userId) and Add new user
    $scope.open = function(userId) {
        
        var modalInstance = $modal.open({
            templateUrl: 'add_price_modal',
            controller: $scope.model,
            resolve: {
                id: function() {
                    return userId;
                }
            }
        });
    };

    $scope.model = function($scope, $modalInstance, id) {
        $scope.laborPrice = {};
        $scope.laborType = $scopeParent.laborType;   // result object from firebase
        $scope.laborUnit = $scopeParent.laborUnit;       // result object from firebase
       
        // if clicked edit. id comes from $scope.modal->userId
        if (angular.isDefined(id)) {
            Data.get('laborDetail/' + id).then(function(results) {
                $scope.laborPrice = results[0];
                $scope.laborPrice.id = id;
                //console.log($scope.laborPrice.labor_type);
                $scope.laborPrice.labor_type = $scope.laborType[$scope.laborPrice.labor_type-1];
                $scope.laborPrice.labor_unit = $scope.laborUnit[$scope.laborPrice.labor_unit-1];
            });
        }
        else
        {            
            $scope.laborPrice.labor_type = $scope.laborType[0];
            $scope.laborPrice.labor_unit = $scope.laborUnit[0];
        }
        // close modal
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

        // Add new user
        $scope.add = function() {
            $scope.laborPrice.company_id = 1;
            
            
            Data.post('addlaborDetail',$scope.laborPrice).then(function(results) {
                $scope.laborPrice.id = results.insertedId;
                $scope.laborPrice.labor_type = $scope.laborPrice.labor_type.id;
                $scope.laborPrice.labor_unit = $scope.laborPrice.labor_unit.id;
                $scopeParent.dataList.splice(0,0,$scope.laborPrice);
                
                Data.toast(results);
            });
            $modalInstance.dismiss('cancel');
        };
       
        // Save edited user.
        
        $scope.save = function() {
         var index = getIndexOf($scopeParent.dataList,$scope.laborPrice.id,"id");
            $scope.laborPrice.labor_type = $scope.laborPrice.labor_type.id;
            $scope.laborPrice.labor_unit = $scope.laborPrice.labor_unit.id;
            $scopeParent.dataList[index] = angular.copy( $scope.laborPrice);
            Data.post('editlaborDetail',$scope.laborPrice).then(function(results) {
               Data.toast(results);
            });
            $modalInstance.dismiss('cancel');
        };
    };
    function getIndexOf(arr, val, prop) {
      var l = arr.length,
        k = 0;
      for (k = 0; k < l; k = k + 1) {
        if (arr[k][prop] === val) {
          return k;
        }
      }
      return false;
    }

});