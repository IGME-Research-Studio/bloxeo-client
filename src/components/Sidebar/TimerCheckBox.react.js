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
    if (this.props.timerState === 'ADMIN_addTimer') {
      return (
      <span onClick={this._onClick}>ADD TIMER</span>
    );
    } else if (this.props.timerState === 'ADMIN_setTimer') {
      return (
      <span onClick={this._onClick}>SET</span>
    );
    } else if (this.props.timerState === 'ADMIN_runTimer') {
      return (
      <span onClick={this._onClick}>STOP</span>
    );
    } else {
      return (
        <span></span>
      );
    }
  },
});

module.exports = TimerCheckBox;
