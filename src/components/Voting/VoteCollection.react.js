const React = require('react');

const VoteCollection = React.createClass({
  render: function() {
    return (
      <div className="voteCollection">
        {this.props.collection.content.map(function(idea, i) {
          return (
            <div className="voteIdeaBlock">
              <div className="voteIdea" votekey={i}>{idea.text}</div>
            </div>
          );
        })}
      </div>
    );
  },
});

module.exports = VoteCollection;
