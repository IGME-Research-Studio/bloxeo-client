/*eslint-disable */
const React = require('react');
/*eslint-enable */
const ReactDOM = require('react-dom');
const StormApp = require('./components/StormApp.react');

window.onload = function() {
  const body = document.querySelector('#app_space');
  ReactDOM.render(<StormApp />, body);
};
