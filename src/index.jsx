import React from 'react';
import ReactDOM from 'react-dom';
import App from "./app.jsx";

const title = 'My Minimal React Webpack Babel Setup cat what';

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);

module.hot.accept();