var app = angular.module('myApp', []);

app.controller('homepageController', function($scope, $timeout) {
    $scope.getPriceInfo = function(currencyFrom, currencyTo) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR");
        //https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=BTC,USD,EUR
        xhr.onload = function () {
            var result = JSON.parse(xhr.response);
            $scope.price = result[currencyTo];
            $scope.showRefresh = false;
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
      }
      $scope.searchFunc = function() {
        console.log("made");
      }
    $scope.getPriceInfo('ETH', 'USD');
    //$scope.getPriceInfo('USD');
    //$scope.price = 4;
});