angular.module("bmComponents").directive("bmDateParser", function () {
    return {
        restrict: "A",
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel) {

            var viewFormat = attrs.bmDateParser.split(",")[0],
                modelFormat = attrs.bmDateParser.split(",")[1];

            ngModel.$parsers.push(function (text) {
                if (modelFormat) {
                    return moment(text, viewFormat).format(modelFormat);
                } else {
                    return moment(text, viewFormat).toISOString();
                }
            });

            ngModel.$formatters.push(function (text) {
                if (!text) {
                    return "";
                } else {
                    return moment(text, modelFormat).format(viewFormat);
                }
            });
        }
    }
})
