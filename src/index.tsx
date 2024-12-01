import React from 'react';
import ReactDOM from 'react-dom/client';
import { StoreProvider } from "./stores/StoreContext";

import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
  <React.StrictMode>
    <StoreProvider>
        <App />
    </StoreProvider>
  </React.StrictMode>
);
