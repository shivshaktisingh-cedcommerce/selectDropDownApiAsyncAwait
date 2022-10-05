import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@shopify/polaris/build/esm/styles.css';
import { AppProvider } from '@shopify/polaris';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
        <App />
  </AppProvider>
);

