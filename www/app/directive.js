angular.module('ngapp')
.directive('checkImage', function() {
   return {
      link: function(scope, element, attrs) {
         element.bind('error', function() {
            element.attr('src', 'https://www.liquery.com/images/LCBO.jpg'); // set default image NOT WORKING!
         });
       }
   }
});