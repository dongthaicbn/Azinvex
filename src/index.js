import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import 'bootstrap/dist/css/bootstrap.min.css';
import LocaleProvider from './utils/providers/LocaleProvider';


import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './utils/redux/configureStore';

export const app = (
  <Provider store={store}>
    <LocaleProvider>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="bottom-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        closeOnToastrClick
      />
      <App />
    </LocaleProvider>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
