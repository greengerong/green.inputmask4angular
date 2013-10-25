'use strict';

angular.module('green.inputmask4angular', [])
    .directive("inputMask", ["$timeout", function ($timeout) {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ngModel) {
                var applyModelEvents = ["oncomplete", "onKeyUp", "onKeyValidation"],
                    maskType = "mask",
                    maskOption,
                    defaultOption = {};

                var applyModel = function (fun) {
                    return function () {
                        (function (args) {
                            $timeout(function () {
                                var viewValue = elm.val();
                                if (viewValue !== ngModel.$viewValue) {
                                    ngModel.$setViewValue(viewValue);
                                    console.log(ngModel.$viewValue);
                                }
                                if (fun) {
                                    fun.apply(scope, args);
                                }
                            });
                        })(Array.prototype.slice.call(arguments));
                    };
                };

                var extendOption = function (option) {
                    angular.forEach(applyModelEvents, function (key) {
                        option[key] = applyModel(option[key]);
                    });

                    return angular.extend(defaultOption, option);
                };

                if (attrs.inputMask) {
                    maskType = scope.$eval(attrs.inputMask) || "mask";
                }

                maskOption = extendOption(scope.$eval(attrs.maskOption) || {});

                if (attrs.formatOption) {
                    var formatOption = scope.$eval(attrs.formatOption);
                    console.log(formatOption, ngModel);
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

                $timeout(function () {
                    elm.inputmask(maskType, maskOption);
                });

            }
        }
    }
    ])
;
