import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import Inbox from './components/inbox';
// import App from './App'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Inbox />, document.getElementById('root'));
registerServiceWorker();
