import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '@/views/app.js';
import '@/styles/base.css';
import '@/styles/index.less';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
)
