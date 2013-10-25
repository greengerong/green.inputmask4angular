'use strict';

angular.module('green.inputmaskApp')
    .controller('MainCtrl', ["$scope", function ($scope) {

        $scope.testoption = {
            "mask": "99-9999999",
            "oncomplete": function () {
                console.log(arguments);
                console.log("oncomplete");
            },
            "onKeyValidation": function () {
                console.log("onKeyValidation");
            }
        }

        $scope.test1 = new Date();

        $scope.testFormatOption = {
            parser: function (viewValue) {
                return viewValue ? new Date(viewValue) : undefined;
            },
            formatter: function (modelValue) {
                console.log(modelValue, "111111");
                if (!modelValue) {
                    return "";
                }
                var date = new Date(modelValue);
                return (date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()).replace(/\b(\d)\b/g, "0$1");
            },
            isEmpty: function (modelValue) {
                return !modelValue;
            }
        };


        $scope.mask = { mask: ["999.999", "aa-aa-aa"]};


        $scope.regexOption = {
            regex: "[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+\\.[a-zA-Z]{2,4}"
        };


    }]);
