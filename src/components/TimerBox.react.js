const React = require('react');
const Timer = require('./Timer.react');
const TimerCheckBox = require('./TimerCheckBox.react');

const TimerBox = React.createClass({
  render: function() {
    return (
      <div className='timerBox'>
        <h5 className="timer-title">Timer</h5>
        <Timer minutes={this.props.time.minutes} seconds={this.props.time.seconds} />
        <TimerCheckBox timerStatus={this.props.timerStatus} />
      </div>
    );
  },
});

module.exports = TimerBox;
