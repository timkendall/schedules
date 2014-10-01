//http://stackoverflow.com/questions/20053557/ng-animate-animation-when-model-changes

angular.module('schedules').directive('animateOnChange', function($animate) {
  return function(scope, elem, attr) {
      scope.$watch(attr.animateOnChange, function(nv,ov) {

        if (nv!=ov) {
          var c = nv > ov?'animated flipInY':'animated flipOutY';
          $animate.addClass(elem,c, function() {
            $animate.removeClass(elem,c);
          });
        }
      });
   };
});