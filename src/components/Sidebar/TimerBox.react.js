const React = require('react');
const Timer = require('./Timer.react');
const TimerCheckBox = require('./TimerCheckBox.react');

const TimerBox = React.createClass({
  render: function() {
    return (
      <div className='timerBox'>
        <TimerCheckBox timerStatus={this.props.timerStatus} />
        <Timer
          minutes={this.props.time.minutes}
          seconds={this.props.time.seconds} />

        <div className="progress">
          <div className="progress-bar progress-bar-info"
            role="progressbar" style={{width: this.props.timerWidth + '%'}}>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = TimerBox;
