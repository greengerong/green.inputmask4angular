'use strict';

angular.module('green.inputmask4angular', [])
    .directive("inputMask", [function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ngModel) {
                var maskType;
                if (attrs.inputMask) {
                    maskType = scope.$eval(attrs.inputMask);
                }



            }
        }
    }]);
