const appInsights = require("applicationinsights");
const serverConfig = require("../serverconfig");

var enabled = false;
try {
    if(serverConfig.applicationInsightsInstrumentationKey) {
        appInsights.setup(serverConfig.applicationInsightsInstrumentationKey)
            .setAutoDependencyCorrelation(true)
            .setAutoCollectRequests(true)
            .setAutoCollectPerformance(true)
            .setAutoCollectExceptions(true)
            .setAutoCollectDependencies(true)
            .setAutoCollectConsole(true)
            .setUseDiskRetryCaching(true)
            .start();

        enabled = true;
    }
} catch (error) {
    console.log("[Logging] " + error);
    enabled = false;
} finally {
    if(enabled) {
        console.log("Connected to the Application Insights instance.");
    } else {
        console.log("Cannot start Application Insights; either pass the value to this app, or use the App Insights default environment variable.");
    }
}

module.exports = {
    ready: enabled,
    logRequest: function(req) {
        let message = `[Request] ${req.method}: ${req.originalUrl}.`;
        console.log(message);
        if(this.ready) {
            appInsights.defaultClient.trackRequest({ name: "normalPage", properties: 
                { type: "page", value: req.originalUrl, dateTime: new Date() }});
        }
    },
    logEvent: function(name, data) {
        let message = `[Event] ${name}: ${data}.`;
        if(this.ready) {
            appInsights.defaultClient.trackEvent({ name: name, properties: { data: data }});
        }
        console.log(message);
    },
    logApiCall: function(apiRoute) {
        let message = `[API] ${apiRoute}.`;
        if(this.ready) {
            appInsights.defaultClient.trackRequest({ name: "apiCall", properties: 
            { type: "api", value: apiRoute, dateTime: new Date() }});
        }
        console.log(message);
    }
}