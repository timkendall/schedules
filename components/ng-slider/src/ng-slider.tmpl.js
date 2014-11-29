(function(angular, undefined) {
'use strict';

angular.module('ngSlider')
.run(['$templateCache', function ($templateCache) {
	$templateCache.put('ng-slider/slider-bar.tmpl.html',
	'<span ng-class="mainSliderClass" id="{{sliderTmplId}}">' +
		'<table><tr><td>' +
			'<div class="jslider-bg">' +
				'<i class="l"></i><i class="f"></i><i class="r"></i>' +
				// '<i class="v"></i>' +
			'</div>' +
			'<div class="jslider-pointer"></div>' +
			'<div class="jslider-pointer jslider-pointer-to"></div>' +
			'<div class="jslider-label"><span ng-bind-html="from"></span></div>' +
			'<div class="jslider-label jslider-label-to"><span ng-bind-html="to"></span>{{options.dimension}}</div>' +
			'<div class="jslider-value"><span></span>{{options.dimension}}</div>' +
			'<div class="jslider-value jslider-value-to"><span></span>{{options.dimension}}</div>' +
			'<div class="jslider-scale" id="{{sliderScaleDivTmplId}}"></div>' +
		'</td></tr></table>' +
	'</span>');
}]);

})(window.angular);
