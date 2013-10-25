'use strict';

describe('green.inputmask4angular', function () {

  beforeEach(module('green.inputmask4angular'));

    var $scope, $compile, elm,$timeout;

    beforeEach(inject(function ($rootScope, _$compile_,_$timeout_) {
        $scope = $rootScope;
        $compile = _$compile_;
        $timeout = _$timeout_;
    }));

    describe('input-mask : mask', function () {
        beforeEach(function () {
            var html = '<input type="text" ng-model="test" input-mask="\'mask\'" mask-option="option"/>';
            $scope.option = {
                "mask": "99-9999999",
                "oncomplete": function () {
                    console.log();
                    console.log(arguments,"oncomplete!this log form controler");
                },
                "onKeyValidation": function () {
                    console.log("onKeyValidation event happend! this log form controler");
                }
            };
            elm = $compile(angular.element(html))($scope).appendTo('body');
            $timeout.flush();
            $scope.$digest();
        });
        it('should show default mask when focus or hover', function () {
            elm.trigger('focus');
            expect(elm[0].value).toEqual('__-_______');
            elm.trigger('blur').trigger('mouseenter');
            expect(elm[0].value).toEqual('__-_______');
        });
        it('should format input to mask', function () {
            elm.val('123456789').trigger('input');
            expect($scope.test).toEqual('12-3456789');
        });

    });

    describe('input-mask : date', function () {
        beforeEach(function () {
            var html = '<input type="text" ng-model="test" input-mask="\'y-m-d\'"/>';
            elm = $compile(angular.element(html))($scope).appendTo('body');
            $timeout.flush();
            $scope.$digest();
        });
        it('should show default mask when focus or hover', function () {
            elm.trigger('focus');
            expect(elm[0].value).toEqual('____-__-__');
            elm.trigger('blur').trigger('mouseenter');
            expect(elm[0].value).toEqual('____-__-__');
        });
        it('should format input to mask', function () {
            elm.val('19890503').trigger('input');
            expect($scope.test).toEqual('1989-05-03');
        });
        it('should ignore other chart', function () {
            elm.val('a$%nZ1s9x8&9').trigger('input');
            expect($scope.test).toEqual('1989-__-__');
        });
    });


    describe('input-mask : format-option', function () {
        beforeEach(function () {
            var html = '<input type="text" ng-model="test" input-mask="\'y-m-d\'" format-option="dateFormatOption"/>';
            var dateFormatOption = {
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
            $scope.dateFormatOption = dateFormatOption;


            elm = $compile(angular.element(html))($scope).appendTo('body');
            $timeout.flush();
            $scope.$digest();
        });
        it('should show value', function () {
            var date = "2011-03-02";
            $scope.test = new Date(date);
            $scope.$digest();
            expect(elm[0].value).toEqual("2011-02-02");
        });

        it('should be call format to set ngmodel', function () {
            var date = '2011-03-02';
            elm.val(date).trigger('input');
            $scope.$digest();
            expect($scope.test).toEqual(new Date(date));
        });
    });

    describe('input-mask : single-option', function () {
        beforeEach(function () {
            var html = '<input type="text" ng-model="test" input-mask="maskOption"/>';
            $scope.maskOption = {
                mask: function(){ return ["999.999", "aa-aa-aa"]; }
            };
            elm = $compile(angular.element(html))($scope).appendTo('body');
            $timeout.flush();
            $scope.$digest();
        });
        it('should have multi option', function () {
            elm.val('a1a1').trigger('input');
            expect($scope.test).toEqual('aa-__-__');
            elm.val('1a1a').trigger('input');
            expect($scope.test).toEqual('11_.___');
        });
    });

    var regex = null;

    describe('input-mask : ', function () {
        beforeEach(function () {
            var html = '<input type="text" ng-model="test" input-mask="\'Regex\'" mask-option="regexOption"/>';
            regex = "[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+\\.[a-zA-Z]{2,4}";
            $scope.regexOption = {
                regex: regex
            };
            elm = $compile(angular.element(html))($scope).appendTo('body');
            $timeout.flush();
            $scope.$digest();
        });
        it('should have match regex', function () {
            elm.val('a1a1@hotmal.com').trigger('input');
            expect($scope.test).toEqual('a1a1@hotmal.com');
            elm.val('aaa#$a!@%11.com').trigger('input');
            expect($scope.test).toEqual('aaaa@11.com');
        });
    });


});
