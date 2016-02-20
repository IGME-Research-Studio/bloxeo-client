import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import renderRoutes from './routes.react';

window.onload = () => {
  render(renderRoutes(browserHistory), document.querySelector('#mount'));
};
