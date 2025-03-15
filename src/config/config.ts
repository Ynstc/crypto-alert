interface Config {
    cryptoCompareApiKey: string;
    wsEndpoint: string;
    subscriptionId: string;
}

if (!process.env.REACT_APP_CRYPTO_COMPARE_API_KEY) {
    throw new Error('REACT_APP_CRYPTO_COMPARE_API_KEY is not defined in environment variables');
}

if (!process.env.REACT_APP_WS_ENDPOINT) {
    throw new Error('REACT_APP_WS_ENDPOINT is not defined in environment variables');
}

if (!process.env.REACT_APP_SUBSCRIPTION_ID) {
    throw new Error('REACT_APP_SUBSCRIPTION_ID is not defined in environment variables');
}

export const config: Config = {
    cryptoCompareApiKey: process.env.REACT_APP_CRYPTO_COMPARE_API_KEY,
    wsEndpoint: process.env.REACT_APP_WS_ENDPOINT,
    subscriptionId: process.env.REACT_APP_SUBSCRIPTION_ID,
}; 