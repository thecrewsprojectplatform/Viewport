import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import './index.css';
import * as serviceWorker from './serviceWorker';

import 'fontsource-roboto';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();