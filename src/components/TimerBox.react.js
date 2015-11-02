const React = require('react');
const Timer = require('./Timer.react');
const TimerCheckBox = require('./TimerCheckBox.react');

const TimerBox = React.createClass({
  render: function() {
    return (
      <div className='timerBox'>
        <div className="progress">
          <Timer minutes={this.props.time.minutes} seconds={this.props.time.seconds} />
          <div className="progress-bar progress-bar-info" role="progressbar" style={{width: this.props.timerWidth + '%'}}>
          </div>
        </div>
        <TimerCheckBox timerStatus={this.props.timerStatus} />
      </div>
    );
  },
});

module.exports = TimerBox;
