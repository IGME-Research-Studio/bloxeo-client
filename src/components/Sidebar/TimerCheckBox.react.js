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
      <span onClick={this._onClick}>START</span>
    );
    } else {
      return (
      <span onClick={this._onClick}>STOP</span>
    );
    }
  },
});

module.exports = TimerCheckBox;
