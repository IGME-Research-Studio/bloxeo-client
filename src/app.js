import { render } from 'react-dom';
import { browserHistory } from 'react-router';

import renderRoutes from './routes';
import io from './io'
import SocketStore from './stores/SocketStore';
import './sass/theme.scss';

window.onload = () => {
  render(renderRoutes(browserHistory), document.querySelector('#mount'));
};
