import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css"

const root = document.getElementById('root');
const rootContainer = ReactDOM.createRoot(root);

rootContainer.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
