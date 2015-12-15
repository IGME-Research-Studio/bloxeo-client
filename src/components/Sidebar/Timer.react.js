const React = require('react');

const Timer = React.createClass({
  render: function() {
    return (
      <div className="timer">
        <span>{this.props.minutes}</span>:<span>{this.props.seconds}</span>
      </div>
    );
  },
});
module.exports = Timer;