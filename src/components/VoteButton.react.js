const React = require('react');

const VoteButton = React.createClass({
  handleClick: function(e) {
    e.preventDefault();
    this.props.changeState(this.props.data === 'true');
  },
  render: function() {
    if (this.props.data === 'true') {
      return <a className="button voteYesButton" onClick={this.handleClick}>Yes</a>;
    }
    return <a className="button voteNoButton" onClick={this.handleClick}>No</a>;
  },
});

module.exports = VoteButton;
