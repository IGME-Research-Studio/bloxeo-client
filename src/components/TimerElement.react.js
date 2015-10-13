const React = require('react');
const Timer = require('../components/Timer.react');
const TimerCheckBox = require('../components/TimerCheckBox.react');
const StormActions = require('../actions/StormActions.js');
const StormStore = require('../stores/StormStore.js');

const TimerSection = React.createClass({
  getInitialState: function() {
    return (
      {
      // get the inital time from the store
        time: StormStore.getTime(),
        // start the timer
        startTimer: null,
      }
    );
  },
  // checks if there is any time remaining and stops the setinterval event
  checkTime: function(time) {
    if (time <= 0) {
      clearInterval(this.state.startTimer);
      StormActions.pauseTimer(true);
    }
  },
  // stops or starts the timer if the checkbox is used
  pauseTime: function(checked) {
    if (checked) {
      clearInterval(this.state.startTimer);
      StormActions.pauseTimer(true);
    }else {
      this.state.startTimer = setInterval(this.countDownTime, 1000);
      StormActions.pauseTimer(false);
    }
  },
  // reduces the time by 1 every second
  countDownTime: function() {
    StormActions.countdown();
    const timeRemaining = parseInt(this.state.time.minutes * 60 + this.state.time.seconds, 10);
    this.checkTime(timeRemaining);
  },
  componentDidMount: function() {
    StormStore.addChangeListener(this._onChange);
    this.state.startTimer = setInterval(this.countDownTime, 1000);
  },
  componentWillUnmount: function() {
    StormStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({
      // update the time
      time: StormStore.getTime(),
    });
  },
  render: function() {
    return (
      <div className='timerBox'>
        <Timer minutes={this.state.time.minutes} seconds={this.state.time.seconds} />
        <TimerCheckBox pause={this.pauseTime} />
      </div>
    );
  },
});

module.exports = TimerSection;
