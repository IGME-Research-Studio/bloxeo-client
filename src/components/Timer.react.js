const React = require('react');

const Timer = React.createClass({
  getInitialState: function() {
    return (
      {
        seconds: this.props.seconds,
        minutes: this.props.minutes,
        // start counting down the timer
        runTimer: setInterval(this.countDown, 1000),
      }
      );
  },
  // adds a 0 in front of a number
  // used when seconds drops below 10
  addZero: function(n) {
    return ( '0' + n );
  },
  // decreases minutes and seconds
  countDown: function() {
    // minutes and seconds added together
    const totalTime = parseInt(this.state.seconds, 10) + parseInt(this.state.minutes, 10);
    this.state.seconds--;
    // when seconds is below 0 decrease minutes by 1
    // and reset seconds to 59
    if (this.state.seconds <= -1) {
      this.state.minutes --;
      this.state.seconds = 59;
    }
    // add a 0 in front of the seconds number when it drops below 10
    if (this.state.seconds < 10) {
      this.state.seconds = this.addZero(this.state.seconds);
    }
    this.setState({
      seconds: this.state.seconds,
      minutes: this.state.minutes,
    });
    this.checkTime(totalTime);
  },
  // checks if time is up and stops the setinterval event
  checkTime: function(time) {
    if (time <= 1) {
      clearInterval(this.state.runTimer);
    }
  },
  render: function() {
    return (
      <div className="timer">
      {this.state.minutes}:{this.state.seconds}
      </div>
    );
  },
});
module.exports = Timer;
