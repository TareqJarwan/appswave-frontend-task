// Packages
import React from "react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { setupListeners } from "@reduxjs/toolkit/query";

import { api } from "state/api";
import globalReducer from "state";

// Components
import App from "./App";

// Styles
import "./index.css";

// Store Congigration
const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  global: globalReducer,
  [api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
