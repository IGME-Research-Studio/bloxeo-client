const React = require('react');

const Timer = React.createClass({
  getInitialState: function() {
    return (
      {
        seconds: this.props.seconds,
        minutes: this.props.minutes,
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
    return ( parseInt(this.state.seconds, 10) );
  },
  componentDidMount: function() {
    // decrease every second if there is time remaining
    setInterval(this.countDown, 1000);
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
