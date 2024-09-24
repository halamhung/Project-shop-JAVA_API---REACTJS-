import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import LogInSignUpStore from './redux/LogInSignUpStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={LogInSignUpStore}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
  </Provider>

);

