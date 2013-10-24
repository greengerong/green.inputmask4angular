'use strict';

describe('test', function () {

  // load the controller's module
  beforeEach(module('green.inputmask4angular'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('xxxxx', function () {
    expect(3).toBe(3);
  });
});
