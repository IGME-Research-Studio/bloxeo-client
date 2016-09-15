const React = require('react');

class VoteCollection extends React.Component {
  render() {
    return (
      <div className="voteCollection">
        {this.props.collection.content.map(function(idea, i) {
          return (
            <div className="voteIdeaBlock" key={i}>
              <div className="voteIdea">{idea.text}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

module.exports = VoteCollection;
