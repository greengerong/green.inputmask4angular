'use strict';

angular.module('green.inputmaskApp')
    .controller('MainCtrl', ["$scope", function ($scope) {

        $scope.testoption = {
            "mask": "99-9999999",
            "oncomplete": function () {
                console.log();
                console.log(arguments,"oncomplete!this log form controler");
            },
            "onKeyValidation": function () {
                console.log("onKeyValidation event happend! this log form controler");
            }
        }

        //default value
        $scope.test1 = new Date();

        $scope.dateFormatOption = {
            parser: function (viewValue) {
                return viewValue ? new Date(viewValue) : undefined;
            },
            formatter: function (modelValue) {
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


        $scope.mask = { regex: ["999.999", "aa-aa-aa"]};


        $scope.regexOption = {
            regex: "[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+\\.[a-zA-Z]{2,4}"
        };

        $scope.functionOption = {
         mask: function () { 
            return ["[1-]AAA-999", "[1-]999-AAA"]; 
        }};


    }]);
