const React = require('react');

const Timer = React.createClass({
  render: function() {
    return (
      <div className="timer">
      {this.props.minutes}:{this.props.seconds}
      </div>
    );
  },
});
module.exports = Timer;
