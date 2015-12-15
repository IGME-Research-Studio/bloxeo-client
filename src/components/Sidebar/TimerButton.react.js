const React = require('react');
const StormActions = require('../../actions/StormActions');
const classNames = require('classnames');

const TimerButton = React.createClass({
  _onClick: function() {
    StormActions.changeTimerState();
    if (this.props.timerState === 'ADMIN_setTimer') {
      // start timer countdown
      StormActions.countdown();
    }
  },

  render: function() {
    const timerButtonClass = classNames({
      'timer-btn': true,
    });

    if (this.props.timerState === 'ADMIN_addTimer') {
      return (
      <span onClick={this._onClick} className={timerButtonClass}>ADD TIMER</span>
    );
    } else if (this.props.timerState === 'ADMIN_setTimer') {
      return (
      <span onClick={this._onClick} className={timerButtonClass}>SET</span>
    );
    } else if (this.props.timerState === 'ADMIN_runTimer') {
      return (
      <span onClick={this._onClick} className={timerButtonClass}>STOP</span>
    );
    } else {
      return (
        <span></span>
      );
    }
  },
});

module.exports = TimerButton;
