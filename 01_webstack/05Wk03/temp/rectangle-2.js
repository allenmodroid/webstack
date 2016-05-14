module.exports = function(x, y, callback) {

    callback(null, {
        perimeter: function() {
            return (2 * (x + y));
        },
        area: function() {
            return (x * y);
        }
    });

}
