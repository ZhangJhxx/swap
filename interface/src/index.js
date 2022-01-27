import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
// import App from './App';
import AppRouter from "./router";
import {Provider} from "react-redux";
import store from "./store";


ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('root')
);


