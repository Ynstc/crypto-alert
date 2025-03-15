## Prerequisites

You need to create your own CryptoCompare API key by registering on [CryptoCompare](https://min-api.cryptocompare.com/). After registration, you can generate your API key in your account settings.

## Configuration

Before running the application, create a `.env` file in the root directory with the following variables:

```env
REACT_APP_CRYPTO_COMPARE_API_KEY=your_api_key  # Replace with your CryptoCompare API key
REACT_APP_WS_ENDPOINT=wss://streamer.cryptocompare.com/v2
REACT_APP_SUBSCRIPTION_ID=8~Binance~BTC~USDT
```

## Running the Application

### Local Development
To run the application locally:
1. Run `npm install` to install all dependencies
2. Create `.env` file as described in the Configuration section
3. Run `npm start` to start the development server
4. The application will automatically open in your browser at `http://localhost:3000`

### Deployment
When deploying to Netlify, make sure to:
1. Add the required environment variables in your Netlify project settings
2. The variables must match exactly the names from the `.env` file
3. After changing environment variables, redeploy your application



### Live Demo
The application is also available at:

[https://crypto-alert-nxlog.netlify.app](https://crypto-alert-nxlog.netlify.app/)