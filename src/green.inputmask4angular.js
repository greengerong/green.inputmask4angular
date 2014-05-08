/******************************************
 *                                        *
 * Auth: green gerong                     *
 * Date: 2012                             *
 * blog: http://greengerong.github.io/    *
 * github: https://github.com/greengerong *
 *                                        *
 ******************************************/

'use strict';

angular.module('green.inputmask4angular', []).directive("inputMask", [ "$timeout", function ($timeout) {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ngModel) {
            var applyModelEvents = [ "oncomplete", "onKeyUp", "onKeyValidation" ], maskType = "mask";

            if (attrs.formatOption) {
                var formatOption = scope.$eval(attrs.formatOption);
                if (formatOption.parser) {
                    ngModel.$parsers.push(formatOption.parser);
                }

                if (formatOption.formatter) {
                    ngModel.$formatters.push(formatOption.formatter);
                }

                if (formatOption.isEmpty) {
                    ngModel.$isEmpty = formatOption.isEmpty;
                }
            }

            var applyModel = function (fun) {
                return function () {
                    (function (args) {
                        $timeout(function () {
                            var viewValue = elm.inputmask('unmaskedvalue');
                            if (viewValue !== ngModel.$viewValue) {
                                ngModel.$setViewValue(viewValue);
                            }
                            if (fun) {
                                fun.apply(scope, args);
                            }
                        });
                    })(Array.prototype.slice.call(arguments));
                };
            };

            var extendOption = function (option) {
                var newOption = angular.extend({}, option);
                angular.forEach(applyModelEvents, function (key) {
                    newOption[key] = applyModel(newOption[key]);
                });

                return newOption;
            };

            if (attrs.inputMask) {
                maskType = scope.$eval(attrs.inputMask);
            }

            if (maskType) {
                if (angular.isObject(maskType)) {
                    var maskOption = extendOption(maskType);
                    $timeout(function () {
                        elm.inputmask(maskOption);
                    });
                } else {
                    var maskOption = extendOption(scope.$eval(attrs.maskOption) || {});
                    $timeout(function () {
                        elm.inputmask(maskType, maskOption);
                    });
                }
            }

            elm.bind("blur", function(){
                $timeout(function () {
                    ngModel.$setViewValue(elm.inputmask('unmaskedvalue'));
                });
            });

        }
    }
} ]);
