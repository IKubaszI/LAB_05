const serverConfig = {
    localServerUrl: 'http://localhost:42224/api/',
    productionServerUrl: 'https://at.usermd.net/api/',
};

export default {
    serverUrl: location.hostname === 'localhost' ? serverConfig.localServerUrl : serverConfig.productionServerUrl
};
