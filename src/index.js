import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrandProvider } from './context/BrandContext';
import './utils/clearAuth0Cache'; // Make clearAuth0Cache() available in console

const onRedirectCallback = (appState) => {
  // Use the appState returnTo if specified, otherwise stay on current path
  window.history.replaceState(
    {},
    document.title,
    appState?.returnTo || window.location.pathname
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Auth0Provider
      domain="retailzero-demo.au.auth0.com"
      clientId="xERyHPEBariMBWqKdMV2we1qFyhi3So6"
      authorizationParams={{ 
        redirect_uri: window.location.origin,
      }}
      onRedirectCallback={onRedirectCallback}
      useRefreshTokens={true}
      cacheLocation="memory"
    >
      <BrandProvider>
        <App />
      </BrandProvider>
    </Auth0Provider>
  </BrowserRouter>
);

