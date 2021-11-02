import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';

/**
 This file is mostly used to add providers.
 Refer to [app.js] for the main entry point to this application.
*/

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
  document.getElementById('root')
);