import 'react-app-polyfill/ie9';
import 'core-js/fn/string/pad-start';
import 'core-js/fn/promise/finally';

import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

if(process.env.NODE_ENV === 'development') {
  if(module.hot){
    module.hot.accept();
  }
}
