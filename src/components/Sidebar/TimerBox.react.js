const React = require('react');
const Timer = require('./Timer.react');
const TimerIcon = require('./TimerIcon.react');
const TimerCheckBox = require('./TimerCheckBox.react');
const timerExists = false;

const TimerBox = React.createClass({
  render: function() {
    if (timerExists) {
      return (
      <div className='timerBox'>
        <TimerIcon />
        <Timer minutes={this.props.time.minutes} seconds={this.props.time.seconds} />
        <div className="progress">
          <div className="progress-bar progress-bar-info"
            role="progressbar" style={{width: this.props.timerWidth + '%'}}>
          </div>
        </div>
        <TimerCheckBox timerStatus={this.props.timerStatus} />
      </div>
    );} else {
      return (
      <div className='timerBox'>
        <TimerIcon />
      </div>
      );}
  },
});

module.exports = TimerBox;
