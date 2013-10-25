'use strict';

describe('green.inputmask4angular', function () {

  beforeEach(module('green.inputmask4angular'));

    var $scope, $compile, elm,$timeout;

    beforeEach(inject(function ($rootScope, _$compile_,_$timeout_) {
        $scope = $rootScope;
        $compile = _$compile_;
        $timeout = _$timeout_;
    }));

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
            elm.trigger('focus').val('19890503').trigger('input');
            expect($scope.test).toEqual('1989-05-03');
        });
        it('should ignore other chart', function () {
            elm.trigger('focus').val('a$%nZ1s9x8&9').trigger('input');
            expect($scope.test).toEqual('1989-__-__');
        });
    });

});
