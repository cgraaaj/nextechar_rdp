import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import * as Sentry from "@sentry/react";


import App from './components/App';
import reducers from './reducers';

Sentry.init({
  dsn: "https://04b420f92ca1455bb1c83465339c3e51@o4504961954807808.ingest.sentry.io/4504961957101568",
  // This enables automatic instrumentation (highly recommended), but is not
  // necessary for purely manual usage.
  // If you only want to use manually, remove the BrowserTracing integration and add
  // Sentry.addTracingExtensions() above your Sentry.init() call.
  integrations: [new Sentry.BrowserTracing()],
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

const store = configureStore({
  reducer: reducers,
  middleware: () => {
    return [thunk];
  },
  devTools: composeWithDevTools,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
