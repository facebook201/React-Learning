import React from 'react';
import ReactDOM from 'react-dom';
import Pt from './example/pt';
import './styles/base.css';
import './styles/index.less';
import './styles/reset.less';

const aname = 1;

ReactDOM.render(
  <Pt name={aname} />,
  document.body
);