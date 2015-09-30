const React = require('react');

const VoteButton = React.createClass({
  handleClick: function(e) {
    e.preventDefault();
    this.props.changeState(this.props.data === 'true');
  },
  render: function() {
    if (this.props.data === 'true') {
      return <button className="yesButton" onClick={this.handleClick}>Yes</button>;
    }
    return <button className="noButton" onClick={this.handleClick}>No</button>;
  },
});

module.exports = VoteButton;
