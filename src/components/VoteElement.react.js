const React = require('react');

const VoteElement = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.idea.toString()}
      </div>
    );
  },
});

module.exports = VoteElement;
