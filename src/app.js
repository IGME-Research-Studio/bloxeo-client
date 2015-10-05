const React = require('react');
const StormApp = require('./components/StormApp.react');

const body = document.querySelector('body');

window.onload = function() {
  React.render(<StormApp />, body);
};