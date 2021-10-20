import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { rootReducer } from './services/reducers/index';
import { socketMiddleware } from './services/middleware'; 
import { compose, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const composeEnhancers =
  typeof window === 'object' && composeWithDevTools
    ? composeWithDevTools({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware()));

export const store = createStore(
  rootReducer,
  enhancer
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename='/ya-react-burger'>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
