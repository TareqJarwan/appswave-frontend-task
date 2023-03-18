// Packages
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { setupListeners } from '@reduxjs/toolkit/query';

import { api } from 'state/api';
import globalReducer from 'state';

// Components
import App from './App';

// Styles
import './index.css';



const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

setupListeners(store.dispatch);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
