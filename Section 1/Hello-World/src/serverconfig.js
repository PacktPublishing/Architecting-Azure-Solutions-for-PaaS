let port = process.env.PORT || process.env.PORT_AZURE || process.env.PORT_AWS || 5000;

// OpenShift ports
if(process.env.OPENSHIFT_NODEJS_PORT) {
    port = process.env.OPENSHIFT_NODEJS_PORT;
}

// Override the ports
if(process.env.OVERRIDE_PORT) {
    port = process.env.CUSTOM_PORT;
}

// Variable name environment variable for the port
if(process.env.VARIABLE_PORT) {
    port = process.env[process.env.VARIABLE_PORT_NAME];
}

module.exports = {
    serverPort: port,
    applicationInsightsInstrumentationKey: process.env.appInsightsKey
};