import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store'
import App from './App';
import { elementsNames } from './settings';
import './styles/styles.scss';
import reportWebVitals from './components/utils/reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById(elementsNames.root));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();