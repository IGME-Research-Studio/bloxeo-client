const React = require('react');

const VoteButton = React.createClass({
  handleClick: function(e) {
    e.preventDefault();
    this.props.changeState(this.props.data === 'true');
  },
  render: function() {
    if (this.props.data === 'true') {
      return (
        <a className="yesButton" onClick={this.handleClick}>
          <i className="fa fa-check"></i>
        </a>
      );
    }
    return (
      <a className="noButton" onClick={this.handleClick}>
        <i className="fa fa-times"></i>
      </a>
    );
  },
});

module.exports = VoteButton;
