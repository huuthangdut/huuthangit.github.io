weatherApp.filter('temp', function() {
    return function(value) {
        return Math.ceil((5 / 9) * (value - 32)) + "°C";
    }
});