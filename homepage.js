var app = angular.module('myApp', []);

app.controller('homepageController', function($scope, $timeout) {

    $scope.getPriceInfo = function(currencyFrom, currencyTo) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://min-api.cryptocompare.com/data/price?fsym=" + currencyFrom + "&tsyms=BTC,USD,EUR");
        //https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=BTC,USD,EUR
        xhr.onload = function () {
            var result = JSON.parse(xhr.response);
            $scope.price = result[currencyTo];
            setTwoNumberDecimal();
            $scope.showRefresh = false;
            $timeout(function() {
                $scope.showRefresh = true;
            }, 3000);
            // console.log($scope.price);
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

    $scope.changeCurrency = function() {
        $scope.currentCurrency = $scope.searchText.toUpperCase();
        $scope.getPriceInfo($scope.currentCurrency, 'USD');
        $scope.searchText = '';
    }

    function setTwoNumberDecimal() {
        $scope.price = parseFloat($scope.price).toFixed(2);
    }
    
    $scope.currentCurrency = 'ETH';
    $scope.getPriceInfo($scope.currentCurrency, 'USD');
    //$scope.getPriceInfo('USD');
    //$scope.price = 4;
});