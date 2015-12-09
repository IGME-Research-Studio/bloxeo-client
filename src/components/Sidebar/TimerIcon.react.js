const React = require('react');
const classNames = require('classnames');

const TimerIcon = React.createClass({
  render: function() {
    const timerIconClass = classNames({
      'fa fa-clock-o timer-btn': true,
    });

    return (
      <i className={timerIconClass}></i>
    );
  },
});

module.exports = TimerIcon;
