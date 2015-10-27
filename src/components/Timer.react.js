const React = require('react');

const Timer = React.createClass({
  render: function() {
    return (
      <div className="timer">
        <span className="underline">{this.props.minutes}</span>:<span className="underline">{this.props.seconds}</span>
      </div>
    );
  },
});
module.exports = Timer;
