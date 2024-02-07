import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App.jsx'
import './index.css'
import {store,persist} from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PersistGate persistor={persist}>

      <Provider store={store}>

        <BrowserRouter>
          <App />
        </BrowserRouter>

      </Provider>

    </PersistGate>
  </React.StrictMode>,
)
