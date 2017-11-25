import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import 'normalize.css';
import './App.css';
// import Quagga from './Quagga.js'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
