weatherApp.controller('homeController', ['$scope', '$location', 'cityService', function ($scope, $location, cityService) {
    $scope.city = cityService.city;

    $scope.$watch('city', function () {
        cityService.city = $scope.city;
    });

    $scope.submit = function () {
        $location.path('/forecast');
    }
}]);

weatherApp.controller('forecastController', ['$scope', '$http', 'cityService', function ($scope, $http, cityService) {

    $scope.city = cityService.city;
    var query = "https://query.yahooapis.com/v1/public/yql?" +
        "q=select * from weather.forecast where woeid in " +
        "(select woeid from geo.places(1) where text='" + $scope.city + "')&format=json";
    $http.get(query)
        .then(function (response) {
            var data = response.data;
            $scope.results = {
                cityName: data.query.results.channel.location.city,
                wind: Math.ceil(data.query.results.channel.wind.speed * 1.6),
                humidity: data.query.results.channel.atmosphere.humidity,
                temp: data.query.results.channel.item.condition.temp,
                weather: data.query.results.channel.item.condition.text,
                forecast: data.query.results.channel.item.forecast
            }
        });
}]);