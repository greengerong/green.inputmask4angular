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
            var ua = navigator.userAgent, chrome = /chrome/i.test(ua), android = /android/i.test(ua);
            if (android && chrome) {
                return;
            }

            var applyModelEvents = [ "oncomplete", "onKeyUp", "onKeyValidation" ], maskType = "mask";

            scope.$watch(attrs.formatOption, function (formatOption) {
                var formatOption = formatOption || {};
                if (formatOption.parser) {
                    ngModel.$parsers.push(formatOption.parser);
                }

                if (formatOption.formatter) {
                    ngModel.$formatters.push(formatOption.formatter);
                }

                if (formatOption.isEmpty) {
                    ngModel.$isEmpty = formatOption.isEmpty;
                }
            });


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

            scope.$watch(attrs.ngModel, applyModel());

            var extendOption = function (option) {
                var newOption = angular.extend({}, option);
                angular.forEach(applyModelEvents, function (key) {
                    newOption[key] = applyModel(newOption[key]);
                });

                return newOption;
            };

            var registerInputMask = function () {
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
                        var maskOption = scope.$eval(attrs.maskOption);
                        if (maskOption) {
                            maskOption = extendOption(maskOption);
                            $timeout(function () {
                                elm.inputmask(maskType, maskOption);
                            });
                        }
                    }
                }
            };

            angular.forEach([attrs.inputMask, attrs.maskOption], function (field) {
                if (field) {
                    scope.$watch(field, registerInputMask);
                }
            });

            scope.$on("$destroy", function () {
                elm.inputmask('remove');
            });
        }
    }
} ]);
