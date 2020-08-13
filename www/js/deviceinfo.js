(function() {
    
    var app = angular.module('starter');
    var Platform = "web";

    app.service('utils.device.deviceInformationService', DeviceInformationService);

    DeviceInformationService.$inject = [];

    function DeviceInformationService() {
        this.isBrowser = function() {
            return !(document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1);
        }
        
        this.isAndroid = function(){
            return cordova.platformId === "android";
        }
        
        this.isIos = function(){
            return cordova.platformId === Platform.iOS;
        }
        
       
    }


})();