/*eslint-disable */
const React = require('react');
/*eslint-enable */
const ReactDOM = require('react-dom');
const StormApp = require('./components/StormApp.react');
const LandingPage = require('./components/Landing/LandingPage.react');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const StormActions   = require('./actions/StormActions');
const createHistory = require('history/lib/createHashHistory.js');
const history = createHistory({
  queryKey: false,
});

window.onload = function() {
  const body = document.querySelector('#app_space');
  // renders the routing path
  ReactDOM.render((
    <Router history={history}>
      <Route path="/" component={LandingPage}/>
      <Route path="workSpace" component={StormApp}/>
    </Router>
  ), body);
  // if page is on the workspace, join the room on page load
  if (window.location.hash.split('?')[0] === '#/workSpace') {
    StormActions.rejoinBoard();
  }
};
