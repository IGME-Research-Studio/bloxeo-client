const React = require('react');
const StormActions = require('../../actions/StormActions');

const TimerCheckBox = React.createClass({
  _onClick: function() {
    if (this.props.timerStatus) {
      StormActions.pauseTimer(false);
    } else {
      StormActions.pauseTimer(true);
    }
  },
  render: function() {
    if (this.props.timerStatus) {
      return (
        <span className="timer-btn start" onClick={this._onClick}>Start</span>
      );
    } else {
      return (
        <span className="timer-btn stop" onClick={this._onClick}>Stop</span>
      );
    }
  },
});

module.exports = TimerCheckBox;
