import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrandProvider } from './context/BrandContext';
// import { getBrandFromHostname } from './config/brands';

// Get current brand based on hostname/subdomain
// const currentBrand = getBrandFromHostname(window.location.hostname);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="retailzero-demo.au.auth0.com"
    clientId="xERyHPEBariMBWqKdMV2we1qFyhi3So6"
    authorizationParams={{ 
      redirect_uri: window.location.origin,
      // organization: currentBrand.orgId, // Temporarily disabled - needs Organizations feature enabled in Auth0
      // audience: 'https://api.retailzero.com', // Optional: API identifier
    }}
    useRefreshTokens={true}
    cacheLocation="localstorage"
  >
    <BrandProvider>
      <App />
    </BrandProvider>
  </Auth0Provider>
);

