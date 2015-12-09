const React = require('react');

const VoteElement = React.createClass({
  render: function() {
    return (
      <div className="idea">
        {this.props.collection.content.map(function(idea, i) {
          return (
            <div key={i}>{idea.text}</div>
          );
        })}
      </div>
    );
  },
});

module.exports = VoteElement;
