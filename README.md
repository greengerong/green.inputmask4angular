green.inputmask4angular
========

This project is a angular adapter for [jquery.inputmask(>=2.3.61)](https://github.com/RobinHerbots/jquery.inputmask). 

[Download this plugin](https://github.com/greengerong/green.inputmask4angular/tree/master/release).:

	https://github.com/greengerong/green.inputmask4angular/tree/master/release


Bower install:

	bower install angular-inputmask
	

## Usage

1. Add the js to your HTML code.

```html
<script src="scripts/jquery.inputmask.bundle.min.js"></script>
<script src="release/green.inputmask4angular.js"></script>
```
2. Add dependency to your app modules
```script
var myApp = angular.module("myApp", ["green.inputmask4angular"]);
```

3. Put directive `input-mask` into your input
```html
<input type="text" ng-model="test" input-mask="'mask'" mask-option="testoption"/>
```
## Demo

>>Please see the app project:

			<div>
		        <h3>mask</h3>
		        <p>Mask: 99-9999999</p>
		        <input type="text" ng-model="test" input-mask="'mask'" mask-option="testoption"/>
		        <pre>{{ test | json }}</pre>
		    </div>

		    <div>
		        <h3>y-m-d</h3>
		        <p>Date: yyyy-MM-dd</p>
		        <input type="text" ng-model="test1" input-mask="'y-m-d'" format-option="dateFormatOption"/>
		        <pre>{{ test1 | json }}</pre>
		    </div>


		    <div>
		        <h3>Regex</h3>
		        <p>Email: "[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+\\.[a-zA-Z]{2,4}"</p>
		        <input type="text" ng-model="test3" input-mask="'Regex'"
		         mask-option="regexOption"/>
		        <pre>{{ test3 | json }}</pre>
		    </div>

		    <div>
		        <h3>Function</h3>
		        <p>"[1-]AAA-999" or  "[1-]999-AAA"</p>
		        <input type="text" ng-model="test4" input-mask="functionOption"/>
		        <pre>{{ test4 | json }}</pre>
		    </div>



>>Controller


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

