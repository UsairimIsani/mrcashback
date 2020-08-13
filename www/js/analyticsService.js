(function() {

    angular
        .module('starter.controllers')
        .service('GoogleAnalyticsService', GoogleAnalyticsService);

    GoogleAnalyticsService.$inject = ['Analytics', 'utils.device.deviceInformationService'];

    function GoogleAnalyticsService (Analytics, DeviceInformationService) {   
        Analytics.set('checkProtocolTask', null);   
        this.trackPage = function (pageUrl, pageTitle, dimensions) {
            this.setDimensions(dimensions);
            Analytics.trackPage(pageUrl, pageTitle);
        };

        this.trackClick = function(name, dimensions) {
            this.setDimensions(dimensions);
            Analytics.trackEvent('button', 'click', name);
        };

        this.trackEvent = function(category, event, name, dimensions) {
            this.setDimensions(dimensions);
            Analytics.trackEvent(category, event, name);
        };

        this.setDimensions = function(dimensions) {
            for (var key in dimensions) {
                if (dimensions.hasOwnProperty(key)) {
                    Analytics.set(key, dimensions[key]);
                }
            }
        };
    }
})();