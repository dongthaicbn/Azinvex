import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import LocaleProvider from './utils/providers/LocaleProvider';

import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './utils/redux/configureStore';

export const app = (
  <Provider store={store}>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
