const React = require('react');

const VoteElement = React.createClass({
  render: function() {
    return (
      <div className="idea">
        {this.props.idea.content.toString()}
      </div>
    );
  },
});

module.exports = VoteElement;
