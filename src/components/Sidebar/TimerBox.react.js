const React = require('react');
const Timer = require('./Timer.react');
const TimerIcon = require('./TimerIcon.react');
const TimerCheckBox = require('./TimerCheckBox.react');

const TimerBox = React.createClass({
  render: function() {
    if (this.props.timerState === 'ADMIN_runTimer') {
      return (
      <div className='timerBox'>
        <TimerIcon />
        <Timer minutes={this.props.time.minutes} seconds={this.props.time.seconds} />
        <div className="progress">
          <div className="progress-bar progress-bar-info"
            role="progressbar" style={{width: this.props.timerWidth + '%'}}>
          </div>
        </div>
        <TimerCheckBox timerStatus={this.props.timerStatus} timerState={this.props.timerState} />
      </div>
      );} else if (this.props.timerState === 'ADMIN_addTimer') {
        return (
        <div className='timerBox'>
          <TimerIcon />
          <TimerCheckBox timerStatus={this.props.timerStatus} timerState={this.props.timerState} />
        </div>
      );} else if (this.props.timerState === 'ADMIN_setTimer') {
        return (
        <div className='timerBox'>
          <TimerIcon />
          <input
          type="text"
          maxLength="2"
          className="timer-set"
          idName="minutes-set"
          placeholder="Minutes"
          />
          <span>:</span>
          <input
          type="text"
          maxLength="2"
          className="timer-set"
          idName="seconds-set"
          placeholder="Seconds"
          />
          <TimerCheckBox timerStatus={this.props.timerStatus} timerState={this.props.timerState} />
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
