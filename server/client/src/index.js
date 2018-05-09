import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import store from './store';
import registerServiceWorker from './registerServiceWorker';
import 'materialize-css/dist/css/materialize.min.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();

console.log('react stripe key', process.env.REACT_APP_STRIPE_KEY);
