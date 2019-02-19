
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from "./routes";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
import Reducer from './reducers';
import apiMiddleware from "./middlewares/api";
import {fetchProducts} from "./actions/productActions";

const createStoreWithMiddleware = applyMiddleware(thunk, apiMiddleware)(createStore);
const store = createStoreWithMiddleware(Reducer , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
store.dispatch(fetchProducts());
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>
, document.getElementById('root'));