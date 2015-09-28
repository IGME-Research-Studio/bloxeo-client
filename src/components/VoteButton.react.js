const React = require('react');

const VoteButton = React.createClass({
  handleClick: function(e) {
    e.preventDefault();
    this.props.changeState(this.props.data === 'true');
  },
  render: function() {
    if (this.props.data === 'true') {
<<<<<<< HEAD
      return <button className="yesButton" onClick={this.handleClick}>Yes</button>;
    }
    return <button className="noButton" onClick={this.handleClick}>No</button>;
=======
      return <a className="button voteYesButton" onClick={this.handleClick}>Yes</a>;
    }
    return <a className="button voteNoButton" onClick={this.handleClick}>No</a>;
>>>>>>> upstream/master
  },
});

module.exports = VoteButton;
