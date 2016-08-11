import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import renderRoutes from './routes';

// Needed for onTouchTap
// Can go away when react 1.0 release
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

window.onload = () => {
  render(renderRoutes(browserHistory), document.querySelector('#mount'));
};
