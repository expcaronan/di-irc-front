import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './Container/App';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Storage/Index';
// CSS side-effect import has no TypeScript declarations.
// @ts-expect-error CSS side-effect import has no type declarations.
import './index.css';
// Bootstrap CSS does not ship TypeScript declarations for side-effect imports.
// @ts-expect-error CSS side-effect import has no type declarations.
import 'bootstrap/dist/css/bootstrap.css';
// bootstrap-icons provides CSS at runtime but does not ship TypeScript declarations for it.
// @ts-expect-error CSS side-effect import has no type declarations.
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.js";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
//
root.render(
  <Provider store={store}>
  {/* <BrowserRouter> */}
  <BrowserRouter basename="/">
    <App />
  </BrowserRouter>
  </Provider> 
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

