"use strict";

angular.module("ngapp", [ "ui.router", "ngMaterial", "ngCordova", "ngStorage" ])
// ngTouch is No Longer Supported by Angular-Material



.run(function($rootScope, $cordovaDevice, $cordovaStatusbar){
  document.addEventListener("deviceready", function () {
	// Set AdMobAds options:
    //admob.setOptions({        publisherId:          "ca-app-pub-6474919292299826/9181251768" });
	console.log("Loading");
    $cordovaStatusbar.overlaysWebView(true); // Always Show Status Bar
    $cordovaStatusbar.styleHex('#42b8ff'); // Status Bar With Red Color, Using Angular-Material Style
    //window.plugins.orientationLock.lock("portrait");

  }, false);
  /* Hijack Android Back Button (You Can Set Different Functions for Each View by Checking the $state.current)
  document.addEventListener("backbutton", function (e) {
      if($state.is('init')){
        navigator.app.exitApp();
      }  else{
        e.preventDefault();
      }
    }, false);*/
})

.config(function($mdThemingProvider, $mdGestureProvider) { // Angular-Material Color Theming
  $mdGestureProvider.skipClickHijack();

  $mdThemingProvider.theme('default')
    .primaryPalette('red')
    .accentPalette('blue');
});

