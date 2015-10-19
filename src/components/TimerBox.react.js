const React = require('react');
const Timer = require('./Timer.react');
const TimerCheckBox = require('./TimerCheckBox.react');

const TimerBox = React.createClass({
  render: function() {
    return (
      <div className='timerBox'>
        <Timer minutes={this.props.time.minutes} seconds={this.props.time.seconds} />
        <TimerCheckBox />
      </div>
    );
  },
});

module.exports = TimerBox;
