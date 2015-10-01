const React = require('react');
const Timer = require('../components/Timer.react');
const TimerCheckBox = require('../components/TimerCheckBox.react');

const TimerSection = React.createClass({
  render: function() {
    return (
      <div className='timerBox'>
        <Timer minutes={2} seconds={30} />
        <TimerCheckBox />
      </div>
    );
  },
});

module.exports = TimerSection;
