var app = angular.module('myApp', []);

app.controller('homepageController', function($scope, $timeout) {
    $scope.getPriceInfo = function(currency) {
        console.log("getting info")
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR");
        //https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=BTC,USD,EUR
        xhr.onload = function () {
            var result = JSON.parse(xhr.response);
            $scope.price = result[currency];
            $scope.showRefresh = false;
            console.log('refresh?', $scope.showRefresh)
            $timeout(function() {
                $scope.showRefresh = true;
             }, 3000);
            console.log($scope.price);
            $scope.$digest()
          };
          xhr.onerror = function (e) {
            console.error(xhr.statusText);
          };
        xhr.send();
        //return result[currency];
      }
    $scope.getPriceInfo('USD');
    //$scope.getPriceInfo('USD');
    //$scope.price = 4;
});