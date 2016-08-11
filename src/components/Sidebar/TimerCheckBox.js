const React = require('react');
const classNames = require('classnames');
const StormActions = require('../../actions/StormActions');

const TimerCheckBox = React.createClass({
  _onClick: function() {
    if (this.props.timerStatus) {
      StormActions.pauseTimer(false);
    }
    else {
      StormActions.pauseTimer(true);
    }
  },
  render: function() {
    const timerIconClass = classNames({
      'fa fa-clock-o timer-btn': true,
      'start': this.props.timerStatus,
      'stop': !this.props.timerStatus,
    });

    return (
      <i className={timerIconClass} onClick={this._onClick}></i>
    );
  },
});

module.exports = TimerCheckBox;
